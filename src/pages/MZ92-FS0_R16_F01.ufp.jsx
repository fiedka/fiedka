import React from "react";

import uefi from "../fixtures/MZ92-FS0_R16_F01.ufp.json";
import usage from "../fixtures/MZ92-FS0_R16_F01.fmap.json";
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
