import React from "react";

import Directory from "../components/Directory";
import File from "./File";

const tSig = (s) => {
  let r = "";
  s.forEach((x) => {
    r += String.fromCharCode(x);
  });
  return r;
};

const getFiles = (d) => {
    return d.entries;
};

// add the actual offset within the file
const transformFile = (file, fptBase, partitionOffset) => ({
  ...file,
  globalOffset: fptBase + partitionOffset + file.offset
});

const MEFS = ({ directories, entries, base }) => {
  return entries.map((e) => {
    const name = tSig(e.name);
    const dir = directories.find(([n, d]) => n === name);
    const files = dir ? getFiles(dir[1]) : [];
    const renderFile = (f, open) => (
      <File
        key={f.offset}
        data={transformFile(f, base, e.offset)}
        open={open}
      />
    );
    return (
      <Directory
        key={name}
        name={name}
        files={files}
        renderFile={renderFile}
      />
    );
  });
};

export default MEFS;
