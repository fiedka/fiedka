import React from "react";

import fixture from "../fixtures/MZ92-FS0_R16_F01.json";
import usage from "../fixtures/MZ92-FS0_R16_F01.fmap_usage.json";
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
          position: sticky;
          top: 0;
          height: 100vh;
        }
      `}</style>
    </>
  );
};

export default Page;
