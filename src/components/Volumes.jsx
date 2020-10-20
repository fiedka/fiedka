import React, { useContext } from "react";
import PropTypes from "prop-types";
import FV from "./FV";

import { GUIDContext } from "../context/GUIDContext";

const Volumes = ({ volumes }) => {
  const guidContext = useContext(GUIDContext);
  const [contextGuid, setContextGuid] = guidContext;
  return (
    <div>
      <header>
        <button onClick={() => setContextGuid(null)}>Clear GUID</button>
        ----{contextGuid}----
      </header>
      {volumes.map((fv) => {
        const guid = fv.Value.FVName.GUID;
        const files = fv.Value.Files || [];
        return (
          <span key={guid}>
            <FV guid={guid} files={files} />
          </span>
        );
      })}
      <style jsx>{`
        header {
          background: #f0f0f0;
          position: sticky;
          top: 0;
        }
      `}</style>
    </div>
  );
};

Volumes.propTypes = {
  volumes: PropTypes.array,
};

export default Volumes;
