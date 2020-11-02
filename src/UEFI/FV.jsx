import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import File from "./File";
import Directory from "../components/Directory";

const FV = forwardRef(function FV(
  { guid, parentGuid, size, ffs, onJumpToFV },
  ref
) {
  const headline = (
    <>
      <span>{guid.toUpperCase()}</span>
      {parentGuid && <span>({parentGuid.toUpperCase()})</span>}
      size: {size}
    </>
  );
  const files = ffs || [];
  return (
    <Directory
      headline={headline}
      files={files}
      renderFile={(file, open) => (
        <File
          key={file.guid}
          file={file}
          open={open}
          onJumpToVolume={onJumpToFV}
        />
      )}
      ref={ref}
    />
  );
});

FV.propTypes = {
  guid: PropTypes.string,
  parentGuid: PropTypes.string,
  size: PropTypes.number,
  ffs: PropTypes.array,
  onJumpToFV: PropTypes.func,
};

export default FV;
