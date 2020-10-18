import React from "react";

import pspDirs from "../fixtures/A3MSTX_3.60.psp.json";
import usage from "../fixtures/A3MSTX_3.60.fmap_usage.json";
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
