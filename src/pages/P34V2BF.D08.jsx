import React from "react";

import fixture from "../fixtures/P34V2BF.D08.json";
import usage from "../fixtures/P34V2BF.D08.fmap_usage.json";
import { GUIDProvider } from "../context/GUIDContext";
import Volumes from "../components/Volumes";
import FlashUsage from "../components/FlashUsage";
import Layout from "../components/Layout";

const Page = () => {
  const uefiRegion = fixture.Regions.find((r) => r.Type === "*uefi.BIOSRegion");
  const volumes = uefiRegion.Value.Elements.filter(
    (e) => e.Type === "*uefi.FirmwareVolume"
  );

  return (
    <Layout sidepane={<FlashUsage usage={usage} />}>
      <GUIDProvider>
        <Volumes volumes={volumes} />
      </GUIDProvider>
    </Layout>
  );
};

export default Page;
