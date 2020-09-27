# UTK Web

This is a web tool rendering JSON output from
[Fiano's](https://github.com/linuxboot/fiano) `utk` utility.

It allows you to investigate UEFI firmware images visually.

## Features

- [x] display used firmware volumes (FVs) as sections
- [x] expand / hide large DXE sections
- [x] mark GUID, highlighted globally
- [x] mark any blob card (no further functionality yet)
- [x] display flash usage as reported by `fmap` (rough start)

## TODO

- [ ] improve flash usage display
- [ ] mark region used by a blob when hovering its card
- [ ] mark BootGuard protected regions
- [ ] load utk as in-browser back-end through WASM
- [ ] load fmap as in-browser back-end through WASM
- [ ] load UEFITool CLI tools as in-browser back-end through WASM

## Development / Contribution

This project is based on the Next.js application framework. It contains a few
widgets (UI components) to render UEFI data structures. If you would like to
contribute, have ideas, etc, please feel free to create issues on GitHub and/or
pull requests. Any form of contribution is highly appreciated. As this tool is
meant to be a GUI (by now :)), usability feedback is very important and welcome.
