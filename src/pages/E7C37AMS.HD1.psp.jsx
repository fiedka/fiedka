import React from "react";

import pspDirs from "../fixtures/E7C37AMS.HD1.psp.json";
import usage from "../fixtures/E7C37AMS.HD1.fmap.json";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import FlashUsage from "../components/FlashUsage";
import Layout from "../components/Layout";
import PSPImage from "../PSP/PspImage";

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
