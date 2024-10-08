# Fiedka

[Fiedka](https://fiedka.app) is a firmware editor app with back-ends running in
[WebAssembly](#webassembly).

## Releases

[![Release](
https://github.com/fiedka/fiedka/actions/workflows/shipit.yml/badge.svg)](
https://github.com/fiedka/fiedka/actions/workflows/shipit.yml)

Binaries are [published on GitHub](https://github.com/fiedka/fiedka/releases).

## Development

The app is based on Electron.

You need to have a [Node.js](https://nodejs.org/) runtime and `npm` installed.
For the back-end, you need [Go](https://go.dev/) version 1.21 at least.
Find them in your respective OS distribution and install them through your
package manager, e.g., `yay -S go nodejs npm`.

To install the dependencies, run `npm install`.

For DXE GUIDs, efiXplorer is used as a submodule. Do an initial checkout:

```
git submodule update --init --checkout
```

### Managing Go dependencies

Due to targeting WebAssembly, we need to pass env vars to the `go` command.

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

### Working with a local copy of Fiano

Clone Fiano side by side with Fiedka; i.e., have them like this:
```
fiano/
fiedka/
```

#### A: Using a Go workspace

Create this symlink: `ln -s go.workspace go.work`
That will tell Go to use `../fiano` instead of `github.com/linuxboot/fiano`.

Note: `go.work` is gitignored so that you cannot accidentally commit it.

#### B: Using a `replace` directive

Add this line to the bottom of `src/go.mod`:

```
replace github.com/linuxboot/fiano => ../../fiano
```

Be sure never to have this in a PR to Fiedka. Prefer the workspace method.

## UEFI

### Obtain Test Images

See [retrage's nightly OVMF builds](https://retrage.github.io/edk2-nightly/).

Download `RELEASEX64_OVMF.fd` and load it using the file picker.

## WebAssembly

- [Research on WebAssembly](https://github.com/sophoslabs/WebAssembly)
- [Understanding WebAssembly](
https://www.sophos.com/en-us/medialibrary/PDFs/technical-papers/understanding-web-assembly.pdf)
- [WASM Tutorial](https://marcoselvatici.github.io/WASM_tutorial/#files)

### WASM issues

- [Most performant way to pass data JS/WASM context](
https://github.com/WebAssembly/design/issues/1231)
