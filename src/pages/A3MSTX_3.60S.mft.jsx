import React from "react";

import mftFixture from "../fixtures/A3MSTX_3.60S.mft.json";
import usage from "../fixtures/A3MSTX_3.60S.fmap.json";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import FlashUsage from "../components/FlashUsage";
import Layout from "../components/Layout";
import PSPImage from "../PSP/PspImage";
import { transform as mftTransform } from "../util/mft";

const pspDirs = mftTransform(mftFixture);

const Page = () => {
  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={usage} />}>
        <PSPImage directories={pspDirs} />
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
