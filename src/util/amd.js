import { hexify, hexifyUnprefixed } from "./hex";

const addrMask = 0x00ffffff;
const ffffffff = 2 ** 32 - 1;

const transformPspEntry = (e) => {
  const {
    Type: sectionType,
    Subprogram: subprogram,
    ROMId: romId,
    Size: size,
    LocationOrValue: address,
  } = e;

  return {
    address: address & addrMask,
    destinationAddress: 0,
    size: size === ffffffff ? 0 : size,
    sectionType,
    info: [],
    version: "abc",
    meta: {
      subprogram,
      romId,
    },
    sizes: {},
  };
};

export const transformPspDir = (dir, range, level) => ({
  address: range.Offset,
  checksum: dir.Checksum,
  magic: dir.PSPCookie,
  entries: dir.Entries.map((e) => transformPspEntry(e)),
  directoryType: `PSP L${level}`,
});

const transformBiosEntry = (e) => {
  const {
    Type: sectionType,
    Subprogram: subprogram,
    ROMId: romId,
    Size: size,
    SourceAddress: address,
    DestinationAddress,
    ResetImage,
    CopyImage,
    ReadOnly,
    Compressed,
  } = e;
  const destinationAddress =
    DestinationAddress !== 0x10000000000000000 ? DestinationAddress : null;

  const info = [];
  if (ResetImage) info.push("resetImage");
  if (CopyImage) info.push("copyImage");
  if (ReadOnly) info.push("readOnly");
  if (Compressed) info.push("compressed");
  return {
    address: address & addrMask,
    destinationAddress,
    size: size === ffffffff ? 0 : size,
    sectionType,
    info,
    version: "abc",
    meta: {
      subprogram,
      romId,
    },
    sizes: {},
  };
};

export const transformBiosDir = (dir, range, level) => ({
  address: range.Offset,
  checksum: dir.Checksum,
  magic: dir.BIOSCookie,
  entries: dir.Entries.map((e) => transformBiosEntry(e)),
  directoryType: `BIOS L${level}`,
});

// TODO: Distinguish PSP and BIOS directory generations when Fiano supports it
export const transformAmdFw = (fw) => {
  const dirs = [];
  fw.PSPDirectories.forEach((d) => {
    if (d.PSPDirectoryLevel1) {
      dirs.push(
        transformPspDir(d.PSPDirectoryLevel1, d.PSPDirectoryLevel1Range, 1)
      );
    }
    if (d.PSPDirectoryLevel2) {
      dirs.push(
        transformPspDir(d.PSPDirectoryLevel2, d.PSPDirectoryLevel2Range, 2)
      );
    }
  });
  fw.BIOSDirectories.forEach((d) => {
    if (d.BIOSDirectoryLevel1) {
      dirs.push(
        transformBiosDir(d.BIOSDirectoryLevel1, d.BIOSDirectoryLevel1Range, 1)
      );
    }
    if (d.BIOSDirectoryLevel2) {
      dirs.push(
        transformBiosDir(d.BIOSDirectoryLevel2, d.BIOSDirectoryLevel2Range, 2)
      );
    }
  });
  return dirs;
};

export const getMeta = (data) => {
  const {
    BIOSDirectoryTableFamily17hModels00h0FhPointer: m00to0f,
    BIOSDirectoryTableFamily17hModels10h1FhPointer: m10to1f,
    BIOSDirectoryTableFamily17hModels30h3FhPointer: m30to3f,
    BIOSDirectoryTableFamily17hModels60h3FhPointer: m60to6f,
    PSPDirectoryTablePointer: pspModern,
    PSPLegacyDirectoryTablePointer: pspLegacy,
    Signature: signature,
    IMC_FW: imcFw,
    GBE_FW: gbeFw,
    XHCI_FW: xhciFw,
  } = data.EmbeddedFirmware;
  return {
    signature: hexifyUnprefixed(signature),
    imcFw: hexify(imcFw),
    gbeFw: hexify(gbeFw),
    xhciFw: hexify(xhciFw),
    directories: {
      psp: {
        modern: hexify(pspModern),
        legacy: hexify(pspLegacy),
      },
      bios: {
        family17: {
          m00to0f: hexify(m00to0f),
          m10to1f: hexify(m10to1f),
          m30to3f: hexify(m30to3f),
          m60to6f: hexify(m60to6f),
        },
      },
    },
  };
};
