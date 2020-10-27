# UTK Web ⚙️

This is a web tool rendering JSON output from
[Fiano's](https://github.com/linuxboot/fiano) `utk` utility.

It allows you to investigate UEFI firmware images visually.

## Usage

Currently, there are the following types of pages (views):

- UEFI explorer
- PSP explorer

See also [TODO](#todo) and [Features](#features).

### Running utk-web

You need to have a [Node.js](https://nodejs.org/) runtime and `npm` installed.
Find them in your respective OS distribution and install them through your
package manager, e.g., `yay -S nodejs npm`.

#### Installing dependencies

The project depends on a handful of packages from the npm registry. Run the
following to install them or update when pulling the utk-web repository:

`npm install`

#### Running utk-web

`npm start`

Then open [http://localhost:3000](http://localhost:3000) in a web browser.

#### Build static pages for deployment

`npm run build`

This will generate a directory `out/` which you can put on a web server under
the path `/utk-web` for static serving. The configuration file `next.config.js`
determines that path. You can adjust it or remove the path according to your
setup.

### Generating Fixtures

To generate the fixtures for the respective view, you need to have the following
CLI tools installed:

- [Fiano](https://github.com/linuxboot/fiano)'s `utk` and `fmap`
- [PSPTool](https://github.com/pspreverse/psptool)

By convention, the fixtures need to have specific names. Here is how to generate
them for a given firmware image. `FIRMWARE_IMAGE` be the path to the image file
and `FIRMWARE_IMAGE_NAME` the name for it to use in utk-web:

- `utk "${FIRMWARE_IMAGE}" json > "src/fixtures/${FIRMWARE_IMAGE_NAME}.json"`
- `fmap jusage "${FIRMWARE_IMAGE}" > "src/fixtures/${FIRMWARE_IMAGE_NAME}.fmap.json"`
- `psptool --json "${FIRMWARE_IMAGE}" > "src/fixtures/${FIRMWARE_IMAGE_NAME}.psp.json"`

#### WIP

The following are not yet supported by upstream nor utk-web, but planned:

- [MFT CLI](https://github.com/Mimoja/MFT-AnalyserV2) from MFT Analyser v2
- [uefi-firmware-parser](https://github.com/theopolis/uefi-firmware-parser)

You would do the following (given the subcommands/switches will not change):

- `mftcli "${FIRMWARE_IMAGE}" json > "src/fixtures/${FIRMWARE_IMAGE_NAME}.mft.json"`
- `uefi-firmware-parser --brute --json "${FIRMWARE_IMAGE}" > "src/fixtures/${FIRMWARE_IMAGE_NAME}.ufp.json"`

### Creating Pages

There are templates for the available kinds of pages in `src/templates/`. Simply
copy them to `src/pages/${FIRMWARE_IMAGE_NAME}*.jsx`, replace the placeholders
with the paths to the respective fixtures, and add links to the pages to the
`src/pages/index.jsx` page to be able to navigate to them from the root page.

For convenience, there is a script: Run `./genpages.sh ${FIRMWARE_IMAGE_NAME}`,
supplying the name of your firmware image as the argument, to generate the
respective pages from the templates. However, you still need to manually add the
links to `src/pages/index.jsx`.

TODO: script to generate fixtures, autogenerate pages from fixtures

## FAQ

> Is there demand?

Yes.

- [https://www.reddit.com/r/Amd/comments/7fr6ml/amd_secure_processor_or_platform_security/](
https://www.reddit.com/r/Amd/comments/7fr6ml/amd_secure_processor_or_platform_security/)
- [https://thinksystem.lenovofiles.com/help/index.jsp?topic=%2F7X01%2Fobservable_problems.html](
https://thinksystem.lenovofiles.com/help/index.jsp?topic=%2F7X01%2Fobservable_problems.html)
- [https://www.dell.com/community/PowerEdge-Hardware-General/Exception-during-the-UEFI-preboot-environment/td-p/7400227](
https://www.dell.com/community/PowerEdge-Hardware-General/Exception-during-the-UEFI-preboot-environment/td-p/7400227)
- [https://software.intel.com/content/www/us/en/develop/documentation/system-debug-legacy-user-guide/top/common-debugger-tasks/debugging-uefi-bios/debugging-in-the-dxe-phase.html](
https://software.intel.com/content/www/us/en/develop/documentation/system-debug-legacy-user-guide/top/common-debugger-tasks/debugging-uefi-bios/debugging-in-the-dxe-phase.html)

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
The [Platform Initialization spec](https://uefi.org/sites/default/files/resources/PI_Spec_1_7_A_final_May1.pdf
) consists of `1541` pages.

> Is there research on UEFI implementations?

Yes. See [https://depletionmode.com/uefi-boot.html](
https://depletionmode.com/uefi-boot.html) for a decent introduction.

> How are UEFI images created?

See [https://edk2-docs.gitbook.io/edk-ii-build-specification/2_design_discussion/22_uefipi_firmware_images
](https://edk2-docs.gitbook.io/edk-ii-build-specification/2_design_discussion/22_uefipi_firmware_images).

> Do UEFI images contain more than just the UEFI firmware?

Yes. On Intel platforms, (CS)ME and ethernet adapter firmware is included, and
likewise, PSP firmware on AMD platforms. This tool can already visualize output
from `PSPTool`. Depending on OEMs and boards, EC firmware may also be included.

> How can the behavior of the binaries be analyzed?

There are a few projects with a focus on binary analysis, such as [efiXplorer](
https://github.com/binarly-io/efiXplorer), an IDA plugin.

> Can DXE drivers be analyzed at runtime?

Sort of.

- [https://github.com/gdbinit/efi_dxe_emulator](
https://github.com/gdbinit/efi_dxe_emulator)
- [https://github.com/assafcarlsbad/efi_dxe_emulator](
https://github.com/assafcarlsbad/efi_dxe_emulator)
- [https://labs.sentinelone.com/moving-from-manual-re-of-uefi-modules-to-dynamic-emulation-of-uefi-firmware/](
https://labs.sentinelone.com/moving-from-manual-re-of-uefi-modules-to-dynamic-emulation-of-uefi-firmware/)

> What is the maximum number of DXE drivers seen on a device in the wild?

AFAIK, close to 1k, nine-hundred-something.

## Features

- [x] display used firmware volumes (FVs) as sections
- [x] flattened UEFI sections
- [x] expand / hide large DXE sections
- [x] mark GUID, highlighted globally
- [x] mark any blob card (no further functionality yet)
- [x] display flash usage as reported by `fmap` (in a side panel)
- [x] visualize PSPTool output
  * sections ("directories") and entries
  * display indicators for properties like verified, signed, packed etc
- [x] mark region used by a blob when hovering its card

## TODO

- [ ] mark BootGuard protected regions
- [ ] load utk as in-browser back-end through WASM
- [ ] load fmap as in-browser back-end through WASM
- [ ] load mftcli as in-browser back-end through WASM
- [ ] load UEFITool CLI tools as in-browser back-end through WASM

## Development / Contribution

This project is based on the Next.js application framework. It contains a few
widgets (UI components) to render UEFI data structures. If you would like to
contribute, have ideas, etc, please feel free to create issues on GitHub and/or
pull requests. Any form of contribution is highly appreciated. As this tool is
meant to be a GUI (by now :)), usability feedback is very important and welcome.
