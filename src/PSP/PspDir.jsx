import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import PspCard from "./PspCard";
import Directory from "../components/Directory";

import { hexify, hexifyUnprefixed } from "../util/hex";

const PspDir = forwardRef(function PspDir({ dir }, ref) {
  const name = hexify(dir.address);
  const cs = dir.checksum
    ? `, checksum: ${hexifyUnprefixed(dir.checksum)}`
    : "";
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
