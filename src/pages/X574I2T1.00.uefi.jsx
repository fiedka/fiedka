import React from "react";
import { Tabs } from "@coalmines/indui";

import ufpFixture from "../fixtures/X574I2T1.00.ufp.json";
import utkFixture from "../fixtures/X574I2T1.00.utk.json";
import usage from "../fixtures/X574I2T1.00.fmap.json";
import { transform as ufpTransform } from "../util/ufp";
import { transform as utkTransform } from "../util/utk";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { GUIDProvider } from "../context/GUIDContext";
import Layout from "../components/Layout";
import FlashUsage from "../components/FlashUsage";
import FirmwareVolumes from "../UEFI/FirmwareVolumes";

const utkVolumes = utkTransform(
  utkFixture.Elements.filter((e) => e.Type === "*uefi.FirmwareVolume")
);

const uefi = ufpFixture.regions.find((r) => r.type === "bios");
const ufpVolumes = ufpTransform(uefi.data.firmwareVolumes);

const Page = () => {
  const ufp = <FirmwareVolumes fvs={ufpVolumes} />;
  const utk = <FirmwareVolumes fvs={utkVolumes} />;

  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={usage} />}>
        <GUIDProvider>
          <div>
            <Tabs
              menu={[
                { id: "ufp", body: ufp, label: "uefi-firmware-parser" },
                { id: "utk", body: utk, label: "utk" },
              ]}
            />
          </div>
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

export default Page;
