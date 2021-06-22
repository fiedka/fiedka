import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import PspCard from "./PspCard";
import Directory from "../components/Directory";

export const hexify = (a) => a.toString(16);

const PspDir = forwardRef(function PspDir({ dir }, ref) {
  const name = `0x${hexify(dir.address)}`;
  const cs = dir.checksum ? `, checksum: ${hexify(dir.checksum)}` : "";
  const meta = `${dir.directoryType} (${dir.magic})${cs}`;
  return (
    <Directory
      name={name}
      meta={meta}
      files={dir.entries}
      renderFile={(p, open, i) => (
        <PspCard key={p.index || i} psp={p} open={open} />
      )}
      ref={ref}
    />
  );
});

PspDir.propTypes = {
  dir: PropTypes.object,
};

export default PspDir;
