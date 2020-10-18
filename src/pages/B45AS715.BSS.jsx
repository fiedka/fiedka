import React from "react";

import fixture from "../fixtures/B45AS715.BSS.json";
import usage from "../fixtures/B45AS715.BSS.fmap_usage.json";
import { GUIDProvider } from "../context/GUIDContext";
import Volumes from "../components/Volumes";
import FlashUsage from "../components/FlashUsage";

const Page = () => {
  const volumes = fixture.Elements.filter(
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
          float: left;
        }
      `}</style>
    </>
  );
};

export default Page;
