import React from "react";
import { Tabs } from "@coalmines/indui";

import ufpFixture from "../fixtures/X370-Pro4_6.30_real.ufp.json";
import utkFixture from "../fixtures/X370-Pro4_6.30_real.utk.json";
import pspFixture from "../fixtures/X370-Pro4_6.30_real.psp.json";
import usage from "../fixtures/X370-Pro4_6.30_real.fmap.json";
import { transform as ufpTransform } from "../util/ufp";
import { transform as utkTransform } from "../util/utk";
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

const Page = () => {
  const ufp = <FirmwareVolumes fvs={ufpVolumes} />;
  const utk = <FirmwareVolumes fvs={utkVolumes} />;
  const psp = <PSPImage directories={pspFixture} />;

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
              ]}
            />
          </div>
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
