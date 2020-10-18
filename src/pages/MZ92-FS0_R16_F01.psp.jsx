import React from "react";

import pspDirs from "../fixtures/MZ92-FS0_R16_F01.psp.json";
import usage from "../fixtures/MZ92-FS0_R16_F01.fmap_usage.json";
import { PubKeyProvider } from "../context/PubKeyContext";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import FlashUsage from "../components/FlashUsage";
import PspDir from "../PSP/PspDir";

const Page = () => {
  return (
    <>
      <MarkedEntriesProvider>
        <div className="layout">
          <PubKeyProvider>
            <div>
              {pspDirs.map((d) => (
                <PspDir key={d.directory} dir={d} />
              ))}
            </div>
          </PubKeyProvider>
          <aside>
            <FlashUsage usage={usage} />
          </aside>
        </div>
      </MarkedEntriesProvider>
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
