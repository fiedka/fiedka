const FILE_FVI = "firmware volume image";
const SECTION_FVI = "Firmware volume image";
const SECTION_TYPE_UI = "User interface name";

export const getName = (file) => {
  const uiSection = file.sections.find(
    (s) => s.sectionType === SECTION_TYPE_UI
  );
  return uiSection && uiSection.name;
};

const SECTION_DXE_DEPEX = "DXE dependency expression";
const SECTION_PEI_DEPEX = "PEI dependency expression";
const SECTION_SMM_DEPEX = "SMM dependency expression";
const SECTIONS_DEPEX = [
  SECTION_DXE_DEPEX,
  SECTION_PEI_DEPEX,
  SECTION_SMM_DEPEX,
];

export const FILE_TYPE_FV_IMAGE = "firmware volume image";

// TODO: this should be done in transforms at read / build time
export const getDepEx = (file) => {
  const depex = file.sections.find((f) =>
    SECTIONS_DEPEX.includes(f.sectionType)
  );
  if (depex) {
    return depex.data;
  }
};

/**
 * Take a UEFI image parsed by uefi-firmware-parser as an array of Firmware
 * Volumes (FVs) and hoist nested FVs from a layer below. Add parent references
 * to keep the relationship intact.
 *
 * FIXME: ugly, untested, welp
 */
export const flatten = (fvs) =>
  fvs.reduce((acc, cur) => {
    // Each entry here is a Firmware Volume (FV). An FV contain a Firmware
    // Filesystem (FFS), which is its body.
    // see https://uefi.org/sites/default/files/resources/PI_Spec_1_7_A_final_May1.pdf
    // Volume 3, section 2.1.2
    // and https://edk2-docs.gitbook.io/edk-ii-build-specification/2_design_discussion/22_uefipi_firmware_images
    // An FFS may contain Firmware Volume Images (FVIs).
    cur.ffs
      .filter(({ fileType }) => fileType === FILE_FVI)
      .forEach((fvi) => {
        // An FVI contains sections. A section contains an optional "data"
        // object, as defined by uefi-firmware-parser, containig subsections.
        // TODO: flatten in uefi-firmware-parser, get rid of extra .data nesting
        fvi.sections
          .filter((s) => s.data && s.data.subsections)
          .forEach((s) => {
            // A subsection may be yet another FVI (== FV). Hoist each FV.
            s.data.subsections
              .filter(({ sectionType }) => sectionType === SECTION_FVI)
              .forEach((fv) => {
                if (fv.data && Array.isArray(fv.data.ffs)) {
                  acc.push({
                    // Save a reference to the parent to allow for telling what
                    // belongs together.
                    parentGuid: fvi.nameGuid,
                    ...fv.data,
                  });
                }
              });
          });
      });
    acc.push(cur);
    return acc;
  }, []);

export const transformFiles = (files) => {
  return files.map((f) => {
    const name = f.name || getName(f);
    // Keep reference to child for quick navigation
    const childFvs = [];
    f.sections
      .filter((s) => s.data && s.data.subsections)
      .forEach((s) => {
        s.data.subsections
          .filter(({ sectionType }) => sectionType === SECTION_FVI)
          .forEach((fv) => {
            if (fv.data && Array.isArray(fv.data.ffs)) {
              const guid = fv.data.nameGuid;
              childFvs.push({ guid });
            }
          });
      });
    return { ...f, name, childFvs };
  });
};

export const transform = (fvs) =>
  flatten(fvs).map((fv) => {
    const files = transformFiles(fv.ffs);
    return { ...fv, files, guid: fv.nameGuid };
  });
