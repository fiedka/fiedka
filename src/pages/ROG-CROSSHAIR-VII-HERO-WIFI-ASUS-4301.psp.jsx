import React from "react";

import pspDirs from "../fixtures/ROG-CROSSHAIR-VII-HERO-WIFI-ASUS-4301.psp.json";
import usage from "../fixtures/ROG-CROSSHAIR-VII-HERO-WIFI-ASUS-4301.fmap.json";
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
