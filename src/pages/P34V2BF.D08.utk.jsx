import React from "react";

import fixture from "../fixtures/P34V2BF.D08.utk.json";
import usage from "../fixtures/P34V2BF.D08.fmap.json";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
import Volumes from "../components/Volumes";
import FlashUsage from "../components/FlashUsage";
import Layout from "../components/Layout";
import { transform } from "../util/utk";

const uefiRegion = fixture.Regions.find((r) => r.Type === "*uefi.BIOSRegion");
const volumes = transform(
  uefiRegion.Value.Elements.filter((e) => e.Type === "*uefi.FirmwareVolume")
);

const Page = () => {
  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={usage} />}>
        <GUIDProvider>
          <Volumes volumes={volumes} />
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
