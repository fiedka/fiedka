import React from "react";

import pspDirs from "../fixtures/ROG-STRIX-X570-E-GAMING.psp.json";
import usage from "../fixtures/ROG-STRIX-X570-E-GAMING.fmap.json";
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
