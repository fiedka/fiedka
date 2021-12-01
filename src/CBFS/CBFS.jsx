import React from "react";
import PropTypes from "prop-types";

import Directory from "../components/Directory";
import File from "./File";

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
