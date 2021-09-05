package main

// samples can be found in linuxhw/ACPI, e.g.
// https://github.com/linuxhw/ACPI/blob/master/Desktop/ASRock/G31/G31M-S/53A47C01E2B6

import (
	"flag"
	"fmt"
	"log"
	"os"
	"sort"

	"github.com/u-root/u-root/pkg/acpi"
)

func main() {
	flag.Parse()
	args := flag.Args()

	var err error
	var path string
	var tabs []acpi.Table

	if len(args) > 0 {
		path = args[0]
		f, err := os.Open(path)
		if err != nil {
			log.Fatal(err)
		}
		tabs, err = acpi.RawFromFile(f)
	} else {
		tabs, err = acpi.RawTablesFromMem()
	}
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Got %d tables\n\n\n", len(tabs))
	sort.SliceStable(tabs, func(i, j int) bool {
		return tabs[i].Sig() < tabs[j].Sig()
	})

	for _, t := range tabs {
		fmt.Printf("======= %v =======\n", t.Sig())
		fmt.Printf("address   |  0x%x\n", t.Address())
		fmt.Printf("tbl size  |  %d\n", t.Len())
		fmt.Printf("revision  |  %d\n", t.Revision())
		fmt.Printf("OEM ID    |  %s\n", t.OEMID())
		fmt.Printf("OEM tbl   |  %v\n", t.OEMTableID())
		fmt.Printf("OEM rev   |  %x\n", t.OEMRevision())
		fmt.Printf("> %v\n\n", acpi.String(t)) // [tablename]@[address] [...]
		// os.Stdout.Write(t.Data())
	}
}
