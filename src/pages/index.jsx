import React from "react";

import fixture from "../fixtures/A3MSTX_3.60.json";
import FV from "../components/FV";

const volumes = fixture.Elements.filter(
  (e) => e.Type === "*uefi.FirmwareVolume"
);

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
