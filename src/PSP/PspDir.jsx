import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import PspCard from "./PspCard";

const hexify = (a) => a.toString(16);

const PspDir = ({ dir }) => {
  const [expand, setExpand] = useState(true);
  const toggleExpand = () => setExpand(!expand);
  return (
    <>
      <div className="flex-around directory" onClick={toggleExpand}>
        <h3>
          <span>{`type: ${dir.directoryType}`}</span>
          <span>{`magic: ${dir.magic}`}</span>
          <span>{`address: 0x${hexify(dir.address)}`}</span>
        </h3>
        <div className={cn("psps", { expand })}>
          {dir.entries.map((p) => (
            <PspCard key={p.index} psp={p} open={expand} />
          ))}
        </div>
      </div>
      <style jsx>{`
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
          margin: 10px 3px;
          padding: 3px;
        }
        .psps {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 10px;
        }
        .psps.expand {
          padding: 0;
        }
      `}</style>
    </>
  );
};

PspDir.propTypes = {
  dir: PropTypes.object,
};

export default PspDir;
