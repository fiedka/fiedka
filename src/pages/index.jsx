import React from "react";
import PropTypes from "prop-types";

import fixture from "../fixtures/A3MSTX_3.60.json";
import BlobCard from "../components/BlobCard";

const FV = ({ guid, files }) => {
  return (
    <>
      <h3>{guid}</h3>
      <div className="FV">
        {files.map((e) => {
          const { GUID, Type } = e.Header;
          return <BlobCard key={GUID.GUID} guid={GUID.GUID} type={Type} />;
        })}
      </div>
      <style jsx>{`
        .FV {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
};

FV.propTypes = {
  guid: PropTypes.string,
  files: PropTypes.array,
};

const volumes = fixture.Elements.filter(
  (e) => e.Type === "*uefi.FirmwareVolume"
);

// const dxes = fixture.Elements[3].Value.Files;
// const peim = fixture.Elements[4].Value.Files;
const Page = () => {
  return (
    <>
      {volumes.map((fv) => {
        const guid = fv.Value.FVName.GUID;
        const files = fv.Value.Files;
        return <FV key={guid} guid={guid} files={files} />;
      })}
    </>
  );
};

export default Page;
