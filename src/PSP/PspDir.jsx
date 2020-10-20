import React from "react";
import PropTypes from "prop-types";
import PspCard from "./PspCard";

const hexify = (a) => a.toString(16);

const PspDir = ({ dir }) => {
  return (
    <>
      <div className="flex-around directory">
        <h3>
          <span>{`type: ${dir.directoryType}`}</span>
          <span>{`magic: ${dir.magic}`}</span>
          <span>{`address: 0x${hexify(dir.address)}`}</span>
        </h3>
        <div className="psps">
          {dir.entries.map((p) => (
            <PspCard psp={p} key={p.index} />
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
        }
        .psps {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
};

PspDir.propTypes = {
  dir: PropTypes.object,
};

export default PspDir;
