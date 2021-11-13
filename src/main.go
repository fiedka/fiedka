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
	"github.com/linuxboot/fiano/pkg/uefi"
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

type Dummy struct {
	W io.Writer
}

func (v *Dummy) Run(f uefi.Firmware) error {
	return f.Apply(v)
}

func (v *Dummy) Visit(f uefi.Firmware) error {
	b, err := json.MarshalIndent(f, "", "")
	if err != nil {
		return err
	}
	fmt.Fprintln(v.W, string(b))
	return nil
}

func utka(this js.Value, args []js.Value) (interface{}, error) {
	size := args[1].Int()
	image := make([]byte, size)
	js.CopyBytesToGo(image, args[0])
	var cli []string
	cli = append(cli, "json")
	parsedRoot, err := uefi.Parse(image)
	if err != nil {
		return nil, err
	}
	var res bytes.Buffer
	dummy := &Dummy{
		W: &res,
	}
	parsedRoot.Apply(dummy)
	if err != nil {
		return nil, err
	}
	return res.String(), nil
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
	gobridge.RegisterCallback("raiseError", err)
	gobridge.RegisterValue("someValue", "Hello World")
	gobridge.RegisterValue("numericValue", 123)

	<-c // Makes the Go process wait until we want it to end
}
