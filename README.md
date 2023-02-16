# Fiedka

This is a work-in-progress version of [Fiedka](https://fiedka.app), based on the
[utk-web](https://github.com/fiedka/fiedka/tree/utk-web) prototype with a
back-end running in [WebAssembly](#webassembly) and written in Go.

[![Release](
https://github.com/fiedka/fiedka/actions/workflows/shipit.yml/badge.svg)](
https://github.com/fiedka/fiedka/actions/workflows/shipit.yml)

## Setup

The app is based on [Electron](https://www.electronjs.org/).

You need to have a [Node.js](https://nodejs.org/) runtime and `npm` installed.
For the back-ends, you need [Go](https://go.dev/) version 1.17 at least, as
well as [Rust](https://www.rust-lang.org/) and [`wasm-pack`](
https://github.com/rustwasm/wasm-pack) in your `$PATH`.

Find them in your respective OS distribution and install them through your
package manager, e.g., `yay -S go nodejs npm rust wasm-pack`.

For `wasm-pack`, you can also `cargo install wasm-pack` (recommended) or use the
[installer](https://rustwasm.github.io/wasm-pack/installer/).

### Nix

On [NixOS](https://nixos.org/) or with the [nix package manager](
https://nixos.wiki/wiki/Nix_package_manager) you can get most dependencies by
running `nix-shell`.

**Note**: This requires maintenance. Please file PRs to improve.

### Preparation

To install the dependencies, run `npm install`.

For DXE GUIDs, efiXplorer is used as a submodule. Do an initial checkout:

```
git submodule update --init --checkout
```

### Managing Go dependencies

Due to targeting WebAssembly, we need it to tell the Go compiler to manage
modules.

**Note**: The `go.mod` file is in `src/`. Run Go commands in that directory.

To upgrade Fiano, one of Fiedka's core dependencies:

```sh
GOOS=js GOARCH=wasm go get github.com/linuxboot/fiano@v1.2.0
```

If you want to add a new dependency, run:

```sh
GOOS=js GOARCH=wasm go get github.com/foo-org/foobar-go@v1.2.3
```

**Note**: Running `go get` may leave inconsistencies in `go.mod`.
Afterwards, always run:

```sh
go mod tidy
```

### Running

```
npm start
```

## Development

### Working with a local copy of Fiano

Clone Fiano side by side with Fiedka; i.e., have them like this:
```
fiano/
fiedka/
```

#### A: Using a Go workspace

This requires Go 1.18. Create this symlink: `ln -s go.workspace go.work`
That will tell Go tu use `../fiano` instead of `github.com/linuxboot/fiano`.

Note: `go.work` is gitignore so that you cannot accidentally commit it.

#### B: Using a `replace` directive

Add this line to the bottom of `src/go.mod`:

```
replace github.com/linuxboot/fiano => ../../fiano
```

Be sure never to have this in a PR to Fiedka. Prefer the workspace method.

### Adding Go dependencies

If you want to add additional Go packages beyond what you currently find in
`src/go.mod`, note that you need to set `GOOS` and `GOARCH`:

```sh
GOOS=js GOARCH=wasm go get github.com/some-org/some-repo
```

## Releases

Binaries for Linux are [published on GitHub](
https://github.com/fiedka/fiedka/releases).

## UEFI

### Obtain Test Images

See [retrage's nightly OVMF builds](https://retrage.github.io/edk2-nightly/).

Download `RELEASEX64_OVMF.fd` and load it using the file picker.

## WebAssembly

Fiedka's back-ends are running in a [WebAssembly](https://webassembly.org/)
context. In order to call into them, two Webpack loaders are set up:

- [@fiedka/golang-wasm-async-loader](https://github.com/fiedka/webpack-golang-wasm-async-loader)
- [@wasm-tool/wasm-pack-plugin](https://github.com/wasm-tool/wasm-pack-plugin)

<img src="https://rustwasm.github.io/wasm-pack/public/img/wasm-ferris.png"
alt="Rust Wasm" height="180" />
<img src="https://github.com/fiedka/webpack-golang-wasm-async-loader/raw/main/docs/wasm-gopher.png" alt="Go Wasm" height="240" />

### More on Wasm

- [Research on WebAssembly](https://github.com/sophoslabs/WebAssembly)
- [Understanding WebAssembly](
https://www.sophos.com/en-us/medialibrary/PDFs/technical-papers/understanding-web-assembly.pdf)
- [WASM Tutorial](https://marcoselvatici.github.io/WASM_tutorial/#files)

### WASM issues

- [Most performant way to pass data JS/WASM context](
https://github.com/WebAssembly/design/issues/1231)
