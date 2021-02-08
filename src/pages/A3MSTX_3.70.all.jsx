import React from "react";
import { Tabs } from "@coalmines/indui";

import ufpFixture from "../fixtures/A3MSTX_3.70.ufp.json";
import utkFixture from "../fixtures/A3MSTX_3.70.utk.json";
import pspFixture from "../fixtures/A3MSTX_3.70.psp.json";
import mftFixture from "../fixtures/A3MSTX_3.70.mft.json";
import usage from "../fixtures/A3MSTX_3.70.fmap.json";
import { transform as ufpTransform } from "../util/ufp";
import { transform as utkTransform } from "../util/utk";
import { transform as mftTransform } from "../util/mft";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
import Layout from "../components/Layout";
import FlashUsage from "../components/FlashUsage";
import FirmwareVolumes from "../UEFI/FirmwareVolumes";
import PSPImage from "../PSP/PspImage";

const utkVolumes = utkTransform(
  utkFixture.Elements.filter((e) => e.Type === "*uefi.FirmwareVolume")
);

const uefi = ufpFixture.regions.find((r) => r.type === "bios");
const ufpVolumes = ufpTransform(uefi.data.firmwareVolumes);

const pspDirs = mftTransform(mftFixture);

const Page = () => {
  const ufp = <FirmwareVolumes fvs={ufpVolumes} />;
  const utk = <FirmwareVolumes fvs={utkVolumes} />;
  const psp = <PSPImage directories={pspFixture} />;
  const mft = <PSPImage directories={pspDirs} />;

  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={usage} />}>
        <GUIDProvider>
          <div>
            <Tabs
              menu={[
                { id: "ufp", body: ufp, label: "uefi-firmware-parser" },
                { id: "utk", body: utk, label: "utk" },
                { id: "psp", body: psp, label: "psp" },
                { id: "mft", body: mft, label: "MFT" },
              ]}
            />
          </div>
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
