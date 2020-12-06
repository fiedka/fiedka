import React from "react";

import utkFixture from "../fixtures/P34V2BF.D08.utk.json";
import usage from "../fixtures/P34V2BF.D08.fmap.json";
import { transform as utkTransform } from "../util/utk";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
import Layout from "../components/Layout";
import FlashUsage from "../components/FlashUsage";
import FirmwareVolumes from "../UEFI/FirmwareVolumes";

// This is different from others becomes it comes from a full image with all
// sections. TODO: move out helpers for general use
const uefiRegion = utkFixture.Regions.find(
  (r) => r.Type === "*uefi.BIOSRegion"
);
const utkVolumes = utkTransform(
  uefiRegion.Value.Elements.filter((e) => e.Type === "*uefi.FirmwareVolume")
);

const Page = () => {
  const utk = <FirmwareVolumes fvs={utkVolumes} />;
  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={usage} />}>
        <GUIDProvider>
          <div>{utk}</div>
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
