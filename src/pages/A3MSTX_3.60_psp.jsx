import React from "react";

import psps from "../fixtures/A3MSTX_3.60.psp.json";
import PspCard from "../components/PspCard";

const Page = () => {
  return (
    <>
      <div className="layout">
        <div>
          <div className="psps">
            {psps.map((p) => (
              <PspCard psp={p} key={p.index} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .layout {
          display: flex;
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
