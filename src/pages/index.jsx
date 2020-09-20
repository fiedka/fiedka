import React, { useContext } from "react";
import PropTypes from "prop-types";

import fixture from "../fixtures/A3MSTX_3.60.json";
import FV from "../components/FV";
import { GUIDProvider, GUIDContext } from "../context/GUIDContext";

const Volumes = ({ volumes }) => {
  const guidContext = useContext(GUIDContext);
  const [contextGuid, setContextGuid] = guidContext;
  return (
    <>
      <header>
        <button onClick={() => setContextGuid(null)}>Clear GUID</button>
        ----{contextGuid}----
      </header>
      {volumes.map((fv) => {
        const guid = fv.Value.FVName.GUID;
        const files = fv.Value.Files;
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
    </>
  );
};

Volumes.propTypes = {
  volumes: PropTypes.array,
};

const Page = () => {
  const volumes = fixture.Elements.filter(
    (e) => e.Type === "*uefi.FirmwareVolume"
  );

  return (
    <GUIDProvider>
      <Volumes volumes={volumes} />
    </GUIDProvider>
  );
};

export default Page;
