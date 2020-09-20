import React from "react";

import fixture from "../fixtures/A3MSTX_3.60.json";
import { GUIDProvider } from "../context/GUIDContext";
import Volumes from "../components/Volumes";

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
