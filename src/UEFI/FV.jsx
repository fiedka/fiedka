import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import File from "./File";
import Directory from "../components/Directory";

const FV = forwardRef(function FV(
  { guid, parentGuid: pGuid, offset, size, ffs, onJumpToFV },
  ref
) {
  const name = `${guid}${pGuid ? ` (${pGuid})` : ""}`.toUpperCase();
  const meta = `${size} bytes`;
  const files = ffs || [];
  return (
    <Directory
      name={name}
      meta={meta}
      offset={offset}
      size={size}
      files={files}
      renderFile={(file, open, key) => (
        <File key={key} file={file} open={open} onJumpToVolume={onJumpToFV} />
      )}
      ref={ref}
    />
  );
});

FV.propTypes = {
  guid: PropTypes.string,
  parentGuid: PropTypes.string,
  offset: PropTypes.number,
  size: PropTypes.number,
  ffs: PropTypes.array,
  onJumpToFV: PropTypes.func,
};

export default FV;
