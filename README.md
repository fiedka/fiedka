# utk-web

## Adding Go dependencies

```sh
GOOS=js GOARCH=wasm go get github.com/...
```

## Running

```
GOPATH=`pwd` GOROOT=/usr/lib/go npm start
```

## WebAssembly

- [Research on WebAssembly](https://github.com/sophoslabs/WebAssembly)
- [Understanding WebAssembly](
https://www.sophos.com/en-us/medialibrary/PDFs/technical-papers/understanding-web-assembly.pdf)
- [WASM Tutorial](https://marcoselvatici.github.io/WASM_tutorial/#files)

### WASM issues

- [Most performant way to pass data JS/WASM context](
https://github.com/WebAssembly/design/issues/1231)
