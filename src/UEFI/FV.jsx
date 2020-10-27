import React from "react";
import PropTypes from "prop-types";

import File from "./File";
import Directory from "../components/Directory";

const FV = ({ guid, parentGuid, size, ffs }) => {
  const headline = (
    <>
      <span>{guid}</span>
      {parentGuid && <span>({parentGuid})</span>}
      size: {size}
    </>
  );
  // FIXME: actually, the FFS is not an array, but an object
  const files = (ffs.length && ffs[0]) || [];
  return (
    <Directory
      headline={headline}
      files={files}
      renderFile={(file, open) => (
        <File key={file.guid} file={file} open={open} />
      )}
    />
  );
};

FV.propTypes = {
  guid: PropTypes.string,
  parentGuid: PropTypes.string,
  size: PropTypes.number,
  ffs: PropTypes.array,
};

export default FV;
