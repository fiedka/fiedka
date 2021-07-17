import React from "react";
import PropTypes from "prop-types";

import { UsedBlock } from "../components/FlashUsage";

const blockSize = 4096;
const maxBlockCount = 42;

const Blocks = ({ size }) => {
  const blockCount = 1 + Math.floor(size / blockSize);
  const blockDisplay = Math.min(maxBlockCount, blockCount);
  return (
    <div>
      <h4>blocks used: {blockCount}</h4>
      <div className="blocks">
        {Array.from({ length: blockDisplay }, (_, i) => (
          <UsedBlock key={i} />
        ))}
        {blockCount > maxBlockCount && "…"}
      </div>
      <style jsx>{`
        h4 {
          margin: 3px 0;
        }
        .blocks {
          display: flex;
          flex-wrap: wrap;
          max-width: 120px;
          line-height: 8px;
        }
      `}</style>
    </div>
  );
};

Blocks.propTypes = {
  size: PropTypes.number,
};

export default Blocks;
