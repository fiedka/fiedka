import React from "react";

import utkFixture from "../fixtures/ovmf-202005.utk.json";
import usage from "../fixtures/ovmf-202005.fmap.json";
import { transform as utkTransform } from "../util/utk";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
import Layout from "../components/Layout";
import FlashUsage from "../components/FlashUsage";
import FirmwareVolumes from "../UEFI/FirmwareVolumes";

const utkVolumes = utkTransform(
  utkFixture.Elements.filter((e) => e.Type === "*uefi.FirmwareVolume")
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
