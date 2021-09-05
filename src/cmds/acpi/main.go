package main

// samples can be found in linuxhw/ACPI, e.g.
// https://github.com/linuxhw/ACPI/blob/master/Desktop/ASRock/G31/G31M-S/53A47C01E2B6

import (
	"bytes"
	"flag"
	"fmt"
	"io/ioutil"
	"unsafe"

	"github.com/fiedka/fiedka/pkg/acpi/aml"
	"github.com/fiedka/fiedka/pkg/acpi/table"
)

func main() {
	var buf bytes.Buffer

	flag.Parse()
	path := flag.Args()[0]

	tree := aml.NewObjectTree()
	tree.CreateDefaultScopes(0)
	p := aml.NewParser(&buf, tree)
	tableIndex := 0
	tableName := "table" // This should be detected by the parser

	f := path
	data, err := ioutil.ReadFile(f)
	if err != nil {
		panic(err)
	}
	sdtHeader := (*table.SDTHeader)(unsafe.Pointer(&data[0]))

	err = p.ParseAML(uint8(tableIndex), tableName, sdtHeader)
	if err != nil {
		fmt.Println("Error:", err)
		fmt.Printf("Trace:\n%v", buf.String())
		return
	}
	var treeDump bytes.Buffer
	tree.PrettyPrint(&treeDump)
	fmt.Print(&treeDump)
}
