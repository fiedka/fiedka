export const getDxesFromFile = (e) => {
  if (e.Type !== "EFI_FV_FILETYPE_FIRMWARE_VOLUME_IMAGE") {
    return [];
  }
  const encaps = e.Sections.find((el) => el.Encapsulated);
  const encapsulated = encaps && encaps.Encapsulated;

  if (encapsulated && Array.isArray(encapsulated)) {
    const encDxes = encapsulated.find(
      (enc) => enc.Value.Type === "EFI_SECTION_FIRMWARE_VOLUME_IMAGE"
    ).Value.Encapsulated[0].Value.Files;
    return encDxes;
  }
  return null;
};

export const hasName = (d) => d.Sections && d.Sections.find((s) => s.Name);

// TODO: can we use the type? Which one is it?
export const isDxe = (d) => d.Type === 7;

export const getName = (d) => {
  const section = d.Sections.find(
    ({ Type }) => Type === "EFI_SECTION_USER_INTERFACE"
  );
  return section.Name;
};

/**
 * get depdency expression section
 */
export const getDepEx = (d) => {
  const section = d.Sections.find(
    ({ Type }) => Type === "EFI_SECTION_DXE_DEPEX"
  );
  // not every DXE has dependencies?
  return (section && section.DepEx) || [];
};

export const getGuidFromDxe = (d) => d.Header.GUID.GUID;

export const getGuidFromDepEx = (depEx) => depEx.GUID && depEx.GUID.GUID;
