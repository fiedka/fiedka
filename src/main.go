//+ build js,wasm

package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"syscall/js"

	"github.com/happybeing/webpack-golang-wasm-async-loader/gobridge"
	amd "github.com/linuxboot/fiano/pkg/amd/manifest"
	"github.com/linuxboot/fiano/pkg/cbfs"
	"github.com/linuxboot/fiano/pkg/uefi"
	"github.com/linuxboot/fiano/pkg/visitors"
)

const (
	// This needed a look at the image; how can we fully automate it?
	mapping = 0xff000000
)

var global = js.Global()

type rowEntry struct {
	Entries []string `json:"entries"`
	Address string   `json:"address"`
}

type FlashLayout struct {
	Data   []rowEntry `json:"layout"`
	Blocks int        `json:"blocks"`
	Full   int        `json:"full"`
	Zero   int        `json:"zero"`
	Used   int        `json:"used"`
}

func cbfsana(this js.Value, args []js.Value) (interface{}, error) {
	size := args[1].Int()
	image := make([]byte, size)
	js.CopyBytesToGo(image, args[0])
	r := bytes.NewReader(image)
	parsed, err := cbfs.NewImage(r)
	if err != nil {
		return nil, err
	}
	j, err := json.Marshal(parsed)
	if err != nil {
		return nil, err
	}
	return string(j), nil
}

type fiedkaVisitor struct {
	Buf *[]byte
	Res io.Writer
	W   io.Writer
}

func (v *fiedkaVisitor) Run(f uefi.Firmware) error {
	return f.Apply(v)
}

func (v *fiedkaVisitor) Visit(f uefi.Firmware) error {
	b, err := json.MarshalIndent(f, "", "")
	if err != nil {
		return err
	}
	fmt.Fprintln(v.Res, string(b))
	a := &visitors.Assemble{}
	f.Apply(a)
	copy(*v.Buf, f.Buf())
	return nil
}

type UtkRes struct {
	Buf []byte
	Err string
	Res string
}

// args: firmware image, image size, replacement binary, replacement size
func mklb(this js.Value, args []js.Value) (interface{}, error) {
	image_size := args[1].Int()
	image := make([]byte, image_size)
	js.CopyBytesToGo(image, args[0])
	parsedRoot, err := uefi.Parse(image)
	if err != nil {
		return nil, err
	}
	kernel_size := args[3].Int()
	kernel := make([]byte, kernel_size)
	js.CopyBytesToGo(kernel, args[2])
	if err != nil {
		return nil, err
	}
	fmt.Printf("Replace BdsDxe with LinuxBoot")
	pred, err := visitors.FindFilePredicate("BdsDxe")
	(&visitors.ReplacePE32{
		Predicate: pred,
		NewPE32:   kernel,
	}).Run(parsedRoot)
	// TODO: reparse
	dbuf := make([]byte, image_size)
	var derr bytes.Buffer
	var dres bytes.Buffer
	parsedRoot.Apply(&fiedkaVisitor{
		Buf: &dbuf,
		W:   &derr,
		Res: &dres,
	})
	res, err := json.Marshal(UtkRes{Err: derr.String(), Res: dres.String(), Buf: dbuf})
	if err != nil {
		return nil, err
	}
	return string(res), nil
}

func utkr(this js.Value, args []js.Value) (interface{}, error) {
	size := args[1].Int()
	image := make([]byte, size)
	js.CopyBytesToGo(image, args[0])
	parsedRoot, err := uefi.Parse(image)
	if err != nil {
		return nil, err
	}
	guidss := []byte(args[2].String())
	var guids []string
	err = json.Unmarshal(guidss, &guids)
	if err != nil {
		return nil, err
	}
	fmt.Printf("Remove %v", guids)
	var fargs []string
	for _, guid := range guids {
		fargs = append(fargs, "remove", guid)
	}
	v, err := visitors.ParseCLI(fargs)
	if err != nil {
		return nil, err
	}
	err = visitors.ExecuteCLI(parsedRoot, v)
	if err != nil {
		return nil, err
	}
	// TODO: reparse
	dbuf := make([]byte, size)
	var derr bytes.Buffer
	var dres bytes.Buffer
	parsedRoot.Apply(&fiedkaVisitor{
		Buf: &dbuf,
		W:   &derr,
		Res: &dres,
	})
	res, err := json.Marshal(UtkRes{Err: derr.String(), Res: dres.String(), Buf: dbuf})
	if err != nil {
		return nil, err
	}
	return string(res), nil
}

func utka(this js.Value, args []js.Value) (interface{}, error) {
	size := args[1].Int()
	image := make([]byte, size)
	js.CopyBytesToGo(image, args[0])
	parsedRoot, err := uefi.Parse(image)
	if err != nil {
		return nil, err
	}
	var derr bytes.Buffer
	var dres bytes.Buffer
	var dbuf []byte
	parsedRoot.Apply(&fiedkaVisitor{
		Buf: &dbuf,
		W:   &derr,
		Res: &dres,
	})
	if err != nil {
		return nil, err
	}
	return dres.String(), nil
}

// Overhead code for amdana
type dummyFirmware struct {
	image []byte
}

func (f dummyFirmware) ImageBytes() []byte {
	return f.image
}

func (f dummyFirmware) PhysAddrToOffset(physAddr uint64) uint64 {
	return physAddr - mapping
}

func (f dummyFirmware) OffsetToPhysAddr(offset uint64) uint64 {
	return offset + mapping
}

// analyze for AMD data structures
func amdana(this js.Value, args []js.Value) (interface{}, error) {
	size := args[1].Int()
	image := make([]byte, size)
	js.CopyBytesToGo(image, args[0])
	var amdfw dummyFirmware

	amdfw.image = image
	fw, err := amd.NewAMDFirmware(amdfw)
	if err != nil {
		return nil, err
	}
	a := fw.PSPFirmware()
	j, err := json.MarshalIndent(a, "", "  ")
	if err != nil {
		return nil, err
	}
	return string(j), nil
}

func fmap(this js.Value, args []js.Value) (interface{}, error) {
	blockSize := 4096
	rowLength := 32

	buffer := make([]byte, blockSize)
	fullBlock := bytes.Repeat([]byte{0xff}, blockSize)
	zeroBlock := bytes.Repeat([]byte{0x00}, blockSize)

	var layout FlashLayout
	var numBlocks, numFull, numZero int

	// TODO: figure out how we can retrieve size from args[0] directly
	size := args[1].Int()
	slice := make([]byte, size) // 1024*1024*16
	// https://golang.org/src/syscall/js/js.go#L568
	// > It returns the number of bytes copied, which will be the minimum of the
	// > lengths of src and dst.
	js.CopyBytesToGo(slice, args[0])
	indata := bytes.NewReader(slice)

loop:
	for {
		var row rowEntry
		row.Address = fmt.Sprintf("%#08x", numBlocks*blockSize)
		for col := 0; col < rowLength; col++ {
			// Read next block.
			_, err := io.ReadFull(indata, buffer)
			if err == io.EOF {
				break loop
			} else if err == io.ErrUnexpectedEOF {
				break loop
			} else if err != nil {
				return nil, err
			}
			numBlocks++

			// Analyze block.
			if bytes.Equal(buffer, fullBlock) {
				numFull++
				row.Entries = append(row.Entries, "full")
			} else if bytes.Equal(buffer, zeroBlock) {
				numZero++
				row.Entries = append(row.Entries, "zero")
			} else {
				row.Entries = append(row.Entries, "used")
			}
		}
		layout.Data = append(layout.Data, row)
	}
	layout.Blocks = numBlocks
	layout.Full = numFull
	layout.Zero = numZero
	layout.Used = numBlocks - numFull - numZero
	data, err := json.MarshalIndent(layout, "", "  ")
	if err != nil {
		return nil, err
	}

	return string(data), nil
}

func add(this js.Value, args []js.Value) (interface{}, error) {
	ret := 0

	for _, item := range args {
		val := item.Int()
		ret += val
	}

	return ret, nil
}

func err(this js.Value, args []js.Value) (interface{}, error) {
	return nil, errors.New("This is an error")
}

func main() {
	c := make(chan struct{}, 0)
	println("Web Assembly is ready")
	gobridge.RegisterCallback("add", add)
	gobridge.RegisterCallback("fmap", fmap)
	gobridge.RegisterCallback("utka", utka)
	gobridge.RegisterCallback("utkr", utkr)
	gobridge.RegisterCallback("mklb", mklb)
	gobridge.RegisterCallback("cbfsana", cbfsana)
	gobridge.RegisterCallback("amdana", amdana)
	gobridge.RegisterCallback("raiseError", err)
	gobridge.RegisterValue("someValue", "Hello World")
	gobridge.RegisterValue("numericValue", 123)

	<-c // Makes the Go process wait until we want it to end
}
