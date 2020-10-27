/**
 * Take a UEFI image as an array of Firmware Volumes (FVs) and hoist nested FVs
 * from a layer below. Add parent references to keep the relationship intact.
 *
 * FIXME: ugly, untested, welp
 */
export const flatten = (fvs) =>
  fvs.reduce((acc, cur) => {
    // Each entry here is a Firmware Volume (FV). An FV contains Firmware
    // Filesystems (FFS).
    cur.ffs.forEach((fs) => {
      // An FFS may containt Firmware Volume Images (FVIs).
      const fvis = fs.filter(
        ({ fileType }) => fileType === "firmware volume image"
      );
      fvis.forEach((fvi) => {
        // An FVI contains sections. A section contains a "data" object, which
        // is defined by uefi-firmware-parser, which holds subsections.
        fvi.sections.forEach((s) => {
          // A subsection may be yet another FVI (== FV). Hoist each FV.
          s.data.subsections
            .filter(
              ({ sectionType }) => sectionType === "Firmware volume image"
            )
            .forEach((fv) => {
              if (fv.data && Array.isArray(fv.data.ffs)) {
                acc.push({
                  // Save a reference to the parent to allow for telling what
                  // belongs together.
                  parentGuid: fvi.guid,
                  ...fv.data,
                });
              }
            });
        });
      });
    });
    acc.push(cur);
    return acc;
  }, []);
