# Fiedka

This is a work-in-progress version of [Fiedka](https://fiedka.app), based on the
[utk-web](https://github.com/fiedka/fiedka/tree/utk-web) prototype with a
back-end running in [WebAssembly](#webassembly) and written in Go.

[![Release](
https://github.com/fiedka/fiedka/actions/workflows/shipit.yml/badge.svg)](
https://github.com/fiedka/fiedka/actions/workflows/shipit.yml)

## Development

The app is based on Electron.

You need to have a [Node.js](https://nodejs.org/) runtime and `npm` installed.
For the back-end, you need [Go](https://go.dev/) version 1.17 at least.
Find them in your respective OS distribution and install them through your
package manager, e.g., `yay -S nodejs npm`.
On NixOS you can get a shell with all dependencies by running `nix-shell`.

To install the dependencies, run `npm install`.

For DXE GUIDs, efiXplorer is used as a submodule. Do an initial checkout:

```
git submodule update --init --checkout
```

### Adding Go dependencies

```sh
GOOS=js GOARCH=wasm go get github.com/...
```

### Running

```
npm start
```

## Releases

Binaries for Linux are [published on GitHub](
https://github.com/fiedka/fiedka/releases).

## UEFI

### Obtain Test Images

See [retrage's nightly OVMF builds](https://retrage.github.io/edk2-nightly/).

Download `RELEASEX64_OVMF.fd` and load it into utk-web
using the file picker.

## WebAssembly

- [Research on WebAssembly](https://github.com/sophoslabs/WebAssembly)
- [Understanding WebAssembly](
https://www.sophos.com/en-us/medialibrary/PDFs/technical-papers/understanding-web-assembly.pdf)
- [WASM Tutorial](https://marcoselvatici.github.io/WASM_tutorial/#files)

### WASM issues

- [Most performant way to pass data JS/WASM context](
https://github.com/WebAssembly/design/issues/1231)
