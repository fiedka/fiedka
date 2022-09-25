import React from "react";
import PropTypes from "prop-types";

import Blocks from "../components/Blocks";
import Entry from "../components/Entry";
import { hexify } from "../util/hex";

const File = ({ data, open }) => {
  const entry = { address: data.Start, length: data.Size };
  const header = (
    <header>
      <span />
      <div className="name">{data.Name || "(no name)"}</div>
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
            <th>type</th>
            <td>{data.Type}</td>
          </tr>
          <tr>
            <th>compression</th>
            <td>{data.Compression || "none"}</td>
          </tr>
          <tr>
            <th>address</th>
            <td>{hexify(data.Start)}</td>
          </tr>
          <tr>
            <th>size</th>
            <td>{data.Size}</td>
          </tr>
        </tbody>
      </table>
      <Blocks size={data.Size} />
    </Entry>
  );
};

File.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
};

export default File;
