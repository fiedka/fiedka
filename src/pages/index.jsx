import React, { useContext } from "react";

import fixture from "../fixtures/A3MSTX_3.60.json";
import FV from "../components/FV";
import { GUIDContext, GUIDProvider } from "../context/GUIDContext";

const volumes = fixture.Elements.filter(
  (e) => e.Type === "*uefi.FirmwareVolume"
);

const Page = () => {
  return (
    <GUIDProvider>
      {volumes.map((fv) => {
        const guidContext = useContext(GUIDContext);
        const { guid: contextGuid, setGuid: setContextGuid } = guidContext;
        const guid = fv.Value.FVName.GUID;
        const files = fv.Value.Files;
        return (
          <span key={guid}>
            ----{contextGuid}----
            <button onClick={() => setContextGuid(guid)}>set</button>
            <FV guid={guid} files={files} />
          </span>
        );
      })}
    </GUIDProvider>
  );
};

export default Page;
