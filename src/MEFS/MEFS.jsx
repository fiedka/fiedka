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

const MEFS = ({ directories, entries }) => {
  return entries.map((e) => {
    const name = tSig(e.name);
    const dir = directories.find(([n, d]) => n === name);
    const files = dir ? getFiles(dir[1]) : [];
    return (
    <Directory
      key={name}
      name={name}
      files={files}
      renderFile={(f, open) => <File key={f.offset} data={f} open={open} />}
    />
    );
  });
};

export default MEFS;
