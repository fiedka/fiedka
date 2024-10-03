import React from "react";
import PropTypes from "prop-types";

import Blocks from "../components/Blocks";
import Entry from "../components/Entry";
import { hexify } from "../util/hex";

const toStr = (s) => {
  let r = "";
  s.forEach((x) => {
    if (x === 0) {
      return;
    }
    r += String.fromCharCode(x);
  });
  return r;
};

const File = ({ data, open }) => {
  const entry = { address: data.address, length: data.size };
  const name = toStr(data.name);
  const header = (
    <header>
      <span />
      <div className="name">{name || "(no name)"}</div>
      <span />
      <style jsx>{`
        header {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          padding: 2px 1px;
          cursor: pointer;
          background-color: #4223;
        }
        .name {
          display: inline-flex;
          align-items: center;
          background-color: #f7f7f7;
          padding: 0 2px;
        }
      `}</style>
    </header>
  );
  return (
    <Entry header={header} open={open} entry={entry}>
      <table>
        <tbody>
          <tr>
            <th>compression</th>
            <td>{data.compression_flag || "none"}</td>
          </tr>
          <tr>
            <th>offset</th>
            <td>{hexify(data.offset)}</td>
          </tr>
          <tr>
            <th>global offset</th>
            <td>{hexify(data.globalOffset)}</td>
          </tr>
          <tr>
            <th>size</th>
            <td>{hexify(data.size)}</td>
          </tr>
        </tbody>
      </table>
      <Blocks size={data.size} />
    </Entry>
  );
};

File.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
};

export default File;
