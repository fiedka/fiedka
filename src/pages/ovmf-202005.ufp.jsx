import React from "react";

import uefi from "../fixtures/ovmf-202005.json";
import usage from "../fixtures/ovmf-202005.fmap.json";
import { GUIDProvider } from "../context/GUIDContext";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
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
