import React, { useContext } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import colors from "../util/colors";
import { MarkedEntriesContext } from "../context/MarkedEntriesContext";

// TODO
const isMarked = (markedBlocks, block, offset) =>
  markedBlocks.includes(block + offset);

// https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
const getMarkedBlocks = ({ address, length }) => {
  const firstBlock = Math.floor(address / 4096);
  const lastBlock = Math.floor((address + length) / 4096);
  const blockCount = lastBlock - firstBlock;
  return Array.from({ length: blockCount + 1 }, (_, i) => firstBlock + i);
};

const FlashUsage = ({ usage }) => {
  const markedEntriesContext = useContext(MarkedEntriesContext);
  const { hoveredEntry, markedEntries } = markedEntriesContext;
  const hoveredBlocks = (hoveredEntry && getMarkedBlocks(hoveredEntry)) || [];
  const markedBlocks =
    (markedEntries && markedEntries.map((e) => getMarkedBlocks(e)).flat()) ||
    [];
  const { layout, blocks, zero, full, used } = usage;
  const rows = layout.map(({ address, entries }, i) => {
    const cols = entries.map((e, j) => {
      const block = parseInt(address) / 4096; // FIXME: not necessary *here*
      const hovered = hoveredEntry && isMarked(hoveredBlocks, block, j);
      const marked = isMarked(markedBlocks, block, j);
      return (
        <td
          key={j}
          className={cn(e, {
            hovered: hovered && !marked,
            marked: marked && !hovered,
            "hovered-marked": hovered && marked,
          })}
        ></td>
      );
    });
    return (
      <tr key={i}>
        <td className="address">{address}</td>
        {cols}
      </tr>
    );
  });

  const percentage = (x) => Math.round((x / blocks) * 10000) / 100;
  const size = (x) => Math.round((x / 256) * 100) / 100;

  return (
    <div className="flash-usage">
      <h2>Flash Usage</h2>
      <table className="legend">
        <tbody>
          <tr>
            <th>blocks</th>
            <td>{blocks}</td>
            <td>100%</td>
            <td>{size(blocks)}M</td>
          </tr>
          <tr>
            <th>
              <div className="zero square"></div> zero (<pre>0x00</pre>)
            </th>
            <td>{zero}</td>
            <td>{percentage(zero)}%</td>
            <td>{size(zero)}M</td>
          </tr>
          <tr>
            <th>
              <div className="full square"></div> free (<pre>0xff</pre>)
            </th>
            <td>{full}</td>
            <td>{percentage(full)}%</td>
            <td>{size(full)}M</td>
          </tr>
          <tr>
            <th>
              <div className="used square"></div> used
            </th>
            <td>{used}</td>
            <td>{percentage(used)}%</td>
            <td>{size(used)}M</td>
          </tr>
        </tbody>
      </table>
      {/* https://stackoverflow.com/questions/41421512/why-does-flex-box-work-with-a-div-but-not-a-table */}
      <div className="flashmap">
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <style jsx>
        {`
          .flash-usage {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            max-height: 100%;
          }
          table {
            width: 420px;
            margin: 5px 0;
            padding: 0;
            font-family: sans-serif;
          }
          th {
            text-align: left;
          }
          .legend td {
            padding-right: 32px;
          }
          .flashmap {
            flex-basis: fit-content;
            flex-shrink: 1;
            overflow-y: scroll;
          }
          pre {
            display: inline;
          }
          .square {
            display: inline-block;
            width: 8px;
            height: 8px;
          }
        `}
      </style>
      <style jsx global>
        {`
          td {
            width: 10px;
            height: 8px;
            padding: 0;
            overflow: hidden;
          }
          .used {
            background-color: ${colors[25]};
          }
          .full {
            background-color: ${colors[14]};
          }
          .zero {
            background-color: ${colors[9]};
          }
          .marked {
            background-color: ${colors[6]};
          }
          .hovered-marked {
            background-color: ${colors[4]};
          }
          .hovered {
            background-color: ${colors[2]};
          }
          .address {
            font-family: monospace;
            font-size: 10px;
            font-weight: bold;
            width: 60px;
            height: 8px;
          }
        `}
      </style>
    </div>
  );
};

FlashUsage.propTypes = {
  usage: PropTypes.object,
};

export default FlashUsage;
