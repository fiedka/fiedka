import React from "react";

import ufpFixture from "../fixtures/P34V2BF.D08.ufp.json";
import usage from "../fixtures/P34V2BF.D08.fmap.json";
import { transform as ufpTransform } from "../util/ufp";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
import Layout from "../components/Layout";
import FlashUsage from "../components/FlashUsage";
import FirmwareVolumes from "../UEFI/FirmwareVolumes";

const uefi = ufpFixture.regions.find((r) => r.type === "bios");
const ufpVolumes = ufpTransform(uefi.data.firmwareVolumes);

const Page = () => {
  const ufp = <FirmwareVolumes fvs={ufpVolumes} />;

  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={usage} />}>
        <GUIDProvider>
          <div>{ufp}</div>
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
