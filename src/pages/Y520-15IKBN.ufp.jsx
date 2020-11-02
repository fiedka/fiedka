import React from "react";

import fixture from "../fixtures/Y520-15IKBN.ufp.json";
import usage from "../fixtures/Y520-15IKBN.fmap.json";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
import FirmwareVolume from "../UEFI/FV";
import FlashUsage from "../components/FlashUsage";
import Layout from "../components/Layout";
import { transform } from "../util/ufp";

const fvs = transform(fixture);

const Page = () => {
  const volumes = fvs.map(({ guid, parentGuid, size, checksum, ffs }) => (
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
