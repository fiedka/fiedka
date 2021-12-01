import React from "react";
import PropTypes from "prop-types";

import Blocks from "../components/Blocks";
import Directory from "../components/Directory";
import Entry from "../components/Entry";

const File = ({ data, open }) => {
  const entry = { address: data.Start, length: data.Size };
  return (
    <Entry header={data.Name} open={open} entry={entry}>
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
            <th>start</th>
            <td>{data.Start}</td>
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

const CBFS = ({ files }) => {
  return (
    <Directory
      name="coreboot"
      files={files}
      renderFile={(f, open) => <File key={f.Start} data={f} open={open} />}
    />
  );
};

CBFS.propTypes = {
  files: PropTypes.array,
};

export default CBFS;
