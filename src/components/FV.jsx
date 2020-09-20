import React, { useState } from "react";
import PropTypes from "prop-types";
import BlobCard from "./BlobCard";

export const getDxes = (e) => {
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

const FV = ({ guid, files }) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div className="fv-card">
        <h3 onClick={() => setVisible(!visible)}>{guid}</h3>
        <div className={`fv${(!visible && " hidden") || ""}`}>
          {files.map((e) => {
            const { GUID } = e.Header;
            const { Type } = e;
            const section = e.Sections && e.Sections.find((s) => s.Name);
            const name = section && section.Name;
            const dxes =
              Type === "EFI_FV_FILETYPE_FIRMWARE_VOLUME_IMAGE" ? getDxes(e) : 0;
            return (
              <BlobCard
                key={GUID.GUID}
                guid={GUID.GUID}
                type={Type}
                name={name}
                dxes={dxes}
              />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .fv-card {
          border: 1px dashed #800020;
          padding: 0 8px;
          margin-bottom: 8px;
        }
        h3 {
          background-color: #dffcdf;
        }
        .fv {
          display: flex;
          flex-wrap: wrap;
        }
        .hidden {
          display: none;
        }
      `}</style>
    </>
  );
};

FV.propTypes = {
  guid: PropTypes.string,
  files: PropTypes.array,
};

export default FV;
