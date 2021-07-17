// import knownDepex from "../../depex/depex.json";

const EFI_SECTION_FVI = "EFI_SECTION_FIRMWARE_VOLUME_IMAGE";
const EFI_SECTION_GUID = "EFI_SECTION_GUID_DEFINED";
const EFI_SECTION_USER_INTERFACE = "EFI_SECTION_USER_INTERFACE";
const EFI_SECTION_DXE_DEPEX = "EFI_SECTION_DXE_DEPEX";
const EFI_SECTION_PEI_DEPEX = "EFI_SECTION_PEI_DEPEX";
const EFI_SECTION_SMM_DEPEX = "EFI_SECTION_SMM_DEPEX";
const EFI_SECTIONS_DEPEX = [
  EFI_SECTION_DXE_DEPEX,
  EFI_SECTION_PEI_DEPEX,
  EFI_SECTION_SMM_DEPEX,
];

export const FILE_TYPE_FV_IMAGE = "EFI_FV_FILETYPE_FIRMWARE_VOLUME_IMAGE";

export const hasName = (d) => d.Sections && d.Sections.find((s) => s.Name);

export const getName = (file) => {
  if (!file.Sections) {
    return null;
  }
  const section = file.Sections.find(
    ({ Type }) => Type === EFI_SECTION_USER_INTERFACE
  );
  return section && section.Name;
};

const knownDepex = [];

/**
 * get depdency expression section
 */
export const getDepEx = (file) => {
  // not every file has sections
  if (!file.Sections) {
    return [];
  }
  const section = file.Sections.find(({ Type }) =>
    EFI_SECTIONS_DEPEX.includes(Type)
  );
  // not every file has dependencies
  if (!section) {
    return [];
  }
  return section.DepEx.map((d) => {
    const known = knownDepex.find((k) => k.guid === getGuidFromDepEx(d));
    if (known) {
      return "known"; // TODO: name
    }
    return d;
  });
};

export const getGuidFromFv = (fv) => fv.Value.FVName.GUID;

export const getGuidFromFile = (file) => file.Header.GUID.GUID;

export const getGuidFromDepEx = (depEx) =>
  (depEx.GUID && depEx.GUID.GUID) || depEx.guid; // TODO: add to transform

export const getFvsFromFile = (f) => {
  const fvs = [];
  const gdef = f.Sections.find((s) => s.Type === EFI_SECTION_GUID);
  if (gdef && gdef.Encapsulated) {
    gdef.Encapsulated.forEach((e) => {
      if (e.Value.Type === EFI_SECTION_FVI) {
        e.Value.Encapsulated.forEach((fv) => fvs.push(fv));
      }
    });
  }
  return fvs;
};

export const flattenVolumes = (volumes) => {
  return volumes.reduce((acc, curr) => {
    if (curr.Value.Files) {
      curr.Value.Files.forEach((f) => {
        if (f.Type === FILE_TYPE_FV_IMAGE) {
          getFvsFromFile(f).forEach((fv) => {
            acc.push({ parent: f, ...fv });
          });
        }
      });
    }
    acc.push(curr);
    return acc;
  }, []);
};

export const transformFiles = (files = []) =>
  files.map((file) => {
    const { Type: fileType, Sections: sections } = file;
    const name = getName(file);
    const guid = getGuidFromFile(file);
    const depEx = getDepEx(file);
    const childFvs = [];
    if (file.Type === FILE_TYPE_FV_IMAGE) {
      const fvs = getFvsFromFile(file);
      fvs.forEach((fv) => {
        childFvs.push({ guid: getGuidFromFv(fv) });
      });
    }
    return {
      guid,
      childFvs,
      name,
      fileType,
      depEx,
      sections: sections || [],
    };
  });

export const transform = (fvs) =>
  flattenVolumes(fvs).map((fv) => {
    const guid = getGuidFromFv(fv);
    const parentGuid = fv.parent && getGuidFromFile(fv.parent);
    const files = transformFiles(fv.Value.Files);
    return { guid, parentGuid, files };
  });
