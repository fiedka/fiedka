# utk-web

This is a development version of [utk-web](
https://github.com/orangecms/utk-web) with an in-browser back-end
running in [WebAssembly](#webassembly).

## Online Demo

To try it out, visit the [demo](https://hostile.education/utk-web2).
Mind that your firmware image is not sent to a server, but processed
in your local web browser only.

## UEFI

### Obtain Test Images

See [retrage's nightly OVMF builds](https://retrage.github.io/edk2-nightly/).

Download `RELEASEX64_OVMF.fd` and load it into utk-web
using the file picker.

## Development

### Adding Go dependencies

```sh
GOOS=js GOARCH=wasm go get github.com/...
```

### Running

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
