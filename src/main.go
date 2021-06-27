//+ build js,wasm

package main

import (
	"errors"
	"syscall/js"

	"../../../gobridge"
)

var global = js.Global()

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
	gobridge.RegisterCallback("raiseError", err)
	gobridge.RegisterValue("someValue", "Hello World")
	gobridge.RegisterValue("numericValue", 123)

	<-c // Makes the Go process wait until we want it to end
}
