# UTK Web

This is a web tool rendering JSON output from
[Fiano's](https://github.com/linuxboot/fiano) `utk` utility.

It allows you to investigate UEFI firmware images visually.

## FAQ

> Is there demand?

Yes.

- https://www.reddit.com/r/Amd/comments/7fr6ml/amd_secure_processor_or_platform_security/
- https://thinksystem.lenovofiles.com/help/index.jsp?topic=%2F7X01%2Fobservable_problems.html
- https://www.dell.com/community/PowerEdge-Hardware-General/Exception-during-the-UEFI-preboot-environment/td-p/7400227
- https://software.intel.com/content/www/us/en/develop/documentation/system-debug-legacy-user-guide/top/common-debugger-tasks/debugging-uefi-bios/debugging-in-the-dxe-phase.html

> How does UEFI work?

Here's a picture of the boot flow [from the TianoCore/EDK2 wiki](
https://github.com/tianocore/tianocore.github.io/wiki/):

![UEFI boot flow](
https://raw.githubusercontent.com/tianocore/tianocore.github.io/master/images/PI_Boot_Phases.JPG)

> Is UEFI complicated?

The [UEFI 2.6 spec](
https://www.uefi.org/sites/default/files/resources/UEFI%20Spec%202_6.pdf) is
`2706` pages long. The [ACPI 6.3 Errata A spec](
https://uefi.org/sites/default/files/resources/ACPI_Spec_6_3_A_Oct_6_2020.pdf)
comprises `1062` pages.

> Is there research on UEFI implementations?

Yes. See https://depletionmode.com/uefi-boot.html for a decent introduction.

> Do UEFI images contain more than just the UEFI firmware?

Yes. On Intel platforms, (CS)ME and ethernet adapter firmware is included, and
likewise, PSP firmware on AMD platforms. This tool can already visualize output
from `PSPTool`. Depending on OEMs and boards, EC firmware may also be included.

> Can DXE drivers be analyzed at runtime?

Sort of.

https://github.com/gdbinit/efi_dxe_emulator

https://github.com/assafcarlsbad/efi_dxe_emulator

https://labs.sentinelone.com/moving-from-manual-re-of-uefi-modules-to-dynamic-emulation-of-uefi-firmware/

> What is the maximum number of DXE drivers seen on a device in the wild?

AFAIK, close to 1k, nine-hundred-something.

## Features

- [x] display used firmware volumes (FVs) as sections
- [x] expand / hide large DXE sections
- [x] mark GUID, highlighted globally
- [x] mark any blob card (no further functionality yet)
- [x] display flash usage as reported by `fmap` (in a side panel)
- [x] visualize PSPTool output
  * sections ("directories") and entries
  * display indicators for properties like verified, signed, packed etc

## TODO

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
