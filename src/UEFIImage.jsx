import React from "react";

import { transform as utkTransform } from "./util/utk";
import { MarkedEntriesProvider } from "./context/MarkedEntriesContext";
import { GUIDProvider } from "./context/GUIDContext";
import Layout from "./components/Layout";
import FlashUsage from "./components/FlashUsage";
import FirmwareVolumes from "./UEFI/FirmwareVolumes";

//      <Layout sidepane={<FlashUsage usage={usage} />}>
const UEFIImage = ({ data }) => {
  const fvs = utkTransform(
    data.Elements.filter((e) => e.Type === "*uefi.FirmwareVolume")
  );

  return (
    <MarkedEntriesProvider>
      <Layout>
        <GUIDProvider>
          <FirmwareVolumes fvs={fvs} />
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default UEFIImage;
