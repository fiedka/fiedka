import React from "react";

import uefi from "../fixtures/A3MSTX_3.60.ufp.json";
import usage from "../fixtures/A3MSTX_3.60.fmap.json";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
// import Volumes from "../UEFI/FirmwareVolumes";
import FlashUsage from "../components/FlashUsage";
import Layout from "../components/Layout";
import FirmwareVolume from "../UEFI/FV";
import { flatten } from "../util/uefi";

const flattened = flatten(uefi);

const Page = () => {
  const volumes = flattened.map(({ guid, parentGuid, size, checksum, ffs }) => (
    <FirmwareVolume
      key={checksum}
      guid={guid}
      parentGuid={parentGuid}
      size={size}
      ffs={ffs}
    />
  ));

  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={usage} />}>
        <GUIDProvider>
          <div>{volumes}</div>
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
