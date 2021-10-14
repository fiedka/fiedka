const transformPspEntry = (e) => {
  const {
    Type: sectionType,
    Subprogram: subprogram,
    ROMId: romId,
    Size: size,
    LocationOrValue: address,
  } = e;

  return {
    address,
    destinationAddress: 0,
    size,
    sectionType,
    info: [],
    version: "abc",
    meta: {},
    sizes: {},
  };
};

export const transformPspDir = (dir, range) => ({
  address: range.Offset,
  checksum: dir.Checksum,
  magic: dir.PSPCookie,
  entries: dir.Entries.map((e) => transformPspEntry(e)),
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
    address,
    destinationAddress,
    size,
    sectionType,
    info,
    version: "abc",
    meta: {},
    sizes: {},
  };
};

export const transformBiosDir = (dir, range) => ({
  address: range.Offset,
  checksum: dir.Checksum,
  magic: dir.BIOSCookie,
  entries: dir.Entries.map((e) => transformBiosEntry(e)),
});

export const transformAmdFw = (css) => {
  const dirs = [];
  if (css.PSPDirectoryLevel1)
    dirs.push(
      transformPspDir(css.PSPDirectoryLevel1, css.PSPDirectoryLevel1Range)
    );
  if (css.PSPDirectoryLevel2)
    dirs.push(
      transformPspDir(css.PSPDirectoryLevel2, css.PSPDirectoryLevel2Range)
    );
  if (css.BIOSDirectoryLevel1)
    dirs.push(
      transformBiosDir(css.BIOSDirectoryLevel1, css.BIOSDirectoryLevel1Range)
    );
  if (css.BIOSDirectoryLevel2)
    dirs.push(
      transformBiosDir(css.BIOSDirectoryLevel2, css.BIOSDirectoryLevel2Range)
    );
  return dirs;
};
