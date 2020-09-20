import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import BlobCard from "./BlobCard";
import { getDxesFromFile } from "../util/dxe-helpers.js";
import { GUIDContext } from "../context/GUIDContext";

const FV = ({ guid, files }) => {
  const guidContext = useContext(GUIDContext);
  const [contextGuid, setContextGuid] = guidContext;
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div className="fv-card">
        <button onClick={() => setContextGuid(guid)}>mark GUID</button>
        <h3
          className={(contextGuid === guid && "selected") || ""}
          onClick={() => setVisible(!visible)}
        >
          {guid}
        </h3>
        <div className={`fv${(!visible && " hidden") || ""}`}>
          {files.map((e) => {
            const { GUID } = e.Header;
            const { Type } = e;
            const section = e.Sections && e.Sections.find((s) => s.Name);
            const name = section && section.Name;
            const dxes = getDxesFromFile(e);

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
        .selected {
          padding-left: 4px;
          color: blue;
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
