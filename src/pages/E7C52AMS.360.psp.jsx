import React from "react";

import pspDirs from "../fixtures/E7C52AMS.360.psp.json";
import { PubKeyProvider } from "../context/PubKeyContext";
import PspCard from "../components/PspCard";

const hexify = (a) => a.toString(16);

const Page = () => {
  return (
    <>
      <div className="layout">
        <div>
          <PubKeyProvider>
            {pspDirs.map((d) => (
              <div key={d.directory} className="flex-around directory">
                <h3>
                  <span>{`type: ${d.directoryType}`}</span>
                  <span>{`magic: ${d.magic}`}</span>
                  <span>{`address: 0x${hexify(d.address)}`}</span>
                </h3>
                <div className="psps">
                  {d.entries.map((p) => (
                    <PspCard psp={p} key={p.index} />
                  ))}
                </div>
              </div>
            ))}
          </PubKeyProvider>
        </div>
      </div>
      <style jsx>{`
        .layout {
          display: flex;
        }
        .flex-around {
          display: flex;
          justify-content: space-around;
        }
        .directory {
          border: 1px dashed #800020;
          padding: 0 8px;
          margin-bottom: 8px;
        }
        h3 {
          display: flex;
          flex-direction: column;
          background-color: #dffcdf;
        }
        .psps {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
};

export default Page;
