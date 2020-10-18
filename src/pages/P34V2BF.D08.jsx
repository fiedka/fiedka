import React from "react";

import fixture from "../fixtures/P34V2BF.D08.json";
import usage from "../fixtures/P34V2BF.D08.fmap_usage.json";
import { GUIDProvider } from "../context/GUIDContext";
import Volumes from "../components/Volumes";
import FlashUsage from "../components/FlashUsage";

const Page = () => {
  const uefiRegion = fixture.Regions.find((r) => r.Type === "*uefi.BIOSRegion");
  const volumes = uefiRegion.Value.Elements.filter(
    (e) => e.Type === "*uefi.FirmwareVolume"
  );

  return (
    <>
      <div className="layout">
        <div>
          <GUIDProvider>
            <Volumes volumes={volumes} />
          </GUIDProvider>
        </div>
        <aside>
          <FlashUsage usage={usage} />
        </aside>
      </div>
      <style jsx>{`
        .layout {
          display: flex;
        }
        aside {
          position: sticky;
          top: 0;
          height: 100vh;
        }
      `}</style>
    </>
  );
};

export default Page;
