export const parseHex = (x) => {
  const slice = x.substr(2, 2);
  const decimal = Number.parseInt(slice, 16);
  return String.fromCharCode(decimal);
};

export const parseEscapedHex = (d) => {
  d.replace(/\\x[0-9,a-f]{2}/g, (x) => parseHex(x));
};

export const b64ToHex = (s) => {
  if (typeof s === "string") {
    const b = Buffer.from(s, "base64");
    return b.toString("hex");
  }
  return "";
};

export const numToHex = (n) => n.toString(16);

export const numArrayToHex = (na) => na.map((n) => numToHex(n)).join("");

export const amdFw = (FW) => {
  const { FET, FlashMapping, Roms } = FW;
  const {
    Location,
    Signature,
    ImcRomBase,
    GecRomBase,
    XHCRomBase,
    PSPDirBase,
    NewPSPDirBase,
    BHDDirBase,
    NewBHDDirBase,
  } = FET;
  console.info("AMD FW:", {
    FET: {
      Location,
      Signature,
      ImcRomBase,
      GecRomBase,
      XHCRomBase,
      PSPDirBase,
      NewPSPDirBase,
      BHDDirBase,
      NewBHDDirBase,
    },
    FlashMapping,
    Roms,
  });
};

const getEntryType = (TypeInfo, Comment) => {
  if (TypeInfo) {
    if (TypeInfo.Name && TypeInfo.Name.match("GEC")) {
      return "Gigabit Ethernet Controller";
    }
    return TypeInfo.Name || TypeInfo.Comment;
  }
  return Comment;
};

export const transformEntry = (e) => {
  const {
    DirectoryEntry,
    Version: version,
    Comment,
    TypeInfo,
    Header, // partially raw struct, sort of, lots of metadata
    Signature, // base64 encoded
    // Raw, // this is the big thing, base64 encoded ;)
  } = e;
  // FIXME: instead, transform PSPTool output (better: fix upstream)
  const info = [];
  let meta = {};
  let sizes = {};
  if (Header) {
    const {
      // TODO: ID,
      IsEncrypted,
      EncFingerprint,
      // TODO: IsSigned,
      SigFingerprint,
      IsCompressed,
      // sizes
      SizeSigned,
      SizePacked,
      FullSize,
    } = Header;
    if (IsEncrypted) {
      info.push("encrypted");
    }
    if (IsCompressed) {
      info.push("compressed");
    }
    const signature = b64ToHex(Signature);
    const sigFingerprint = numArrayToHex(SigFingerprint);
    const encFingerprint = numArrayToHex(EncFingerprint);
    meta = { signature, sigFingerprint, encFingerprint };
    sizes = {
      signed: SizeSigned || null,
      packed: SizePacked || null,
      uncompressed: FullSize || null,
    };
  }
  const { Location: address, Size: size, Destination } = DirectoryEntry;
  const destinationAddress =
    Destination !== 0x10000000000000000 ? Destination : null;
  const sectionType = getEntryType(TypeInfo, Comment);
  return {
    address,
    destinationAddress,
    size,
    sectionType,
    info,
    version,
    meta,
    sizes,
  };
};

export const transformDir = ({ Header, Entries, Location: address }) => {
  const entries = [];
  Entries.forEach((e) => {
    entries.push(transformEntry(e));
  });
  const checksum = Header && Header.Checksum;
  const magic =
    Header &&
    Header.Cookie &&
    Header.Cookie.reduce((a, c) => a + String.fromCharCode(c), "");
  // TODO: Header.Reserved
  return { address, entries, magic, checksum };
};

const transformAmdFw = (fw) => {
  const { Roms } = fw;
  const dirs = [];
  if (Roms) {
    Roms.forEach(({ Type: directoryType, Directories: directories }) => {
      directories.forEach((d) => {
        dirs.push({ ...transformDir(d), directoryType });
      });
    });
  }
  return dirs;
};

export const transform = (mft) => {
  const { AMDAGESA, AMDFirmware } = mft;
  /*
  if (AMDAGESA) {
    console.info("AGESA entries:", AMDAGESA.length);
    AMDAGESA.forEach((a) => {
      const { Header, Offset } = a;
      console.info({
        Header,
        Offset,
      });
    });
  }
  */
  if (AMDFirmware) {
    return transformAmdFw(AMDFirmware);
  }
  return [];
};
