import React from "react";

import fixture from "../fixtures/A3MSTX_3.60.json";
import usage from "../fixtures/A3MSTX_3.60.fmap_usage.json";
import { GUIDProvider } from "../context/GUIDContext";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import Volumes from "../components/Volumes";
import FlashUsage from "../components/FlashUsage";

const Page = () => {
  const volumes = fixture.Elements.filter(
    (e) => e.Type === "*uefi.FirmwareVolume"
  );

  return (
    <>
      <MarkedEntriesProvider>
        <div className="layout">
          <div>
            <GUIDProvider>
              <Volumes volumes={volumes} />
            </GUIDProvider>
          </div>
          <aside>
            <h2>Flash Usage</h2>
            <FlashUsage usage={usage} />
          </aside>
        </div>
      </MarkedEntriesProvider>
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
