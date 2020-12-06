import React from "react";
import PropTypes from "prop-types";
import { Boop } from "@coalmines/indui";

import Blocks from "../components/Blocks";
import Entry from "../components/Entry";
import DepEx from "./DepEx";

// TODO: Handle multiple FVs? Is it possible?
export const getFviGuid = (file) => {
  const fv = file.childFvs && file.childFvs[0];
  if (fv) {
    return fv.guid;
  }
};

const File = ({ file, open, onJumpToVolume }) => {
  const { guid, name, size, fileType, depEx } = file;
  const headline = name || guid.toUpperCase();
  const header = (
    <div className="header">
      <span className="guid">{headline}</span>
      <style jsx>{`
        .header {
          padding: 2px 1px;
        }
        .guid {
          background-color: #f7f7f7;
          padding: 0 2px;
        }
      `}</style>
    </div>
  );
  const jumpToVolume = (e) => {
    if (onJumpToVolume) {
      onJumpToVolume(getFviGuid(file));
    }
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <Entry open={open} entry={{ address: 0, size }} header={header}>
      {depEx && depEx.length > 0 && <DepEx depEx={depEx} />}
      <div className="top">
        {name && <div>guid: {guid.toUpperCase()}</div>}
        <span>type: {fileType}</span>
        <div>size: {size}</div>
        <Blocks size={size} />
        {file.childFvs.length > 0 && (
          <Boop onClick={jumpToVolume}>Jump to firmware volume</Boop>
        )}
      </div>
      <style jsx>{`
        .top {
        }
      `}</style>
    </Entry>
  );
};

File.propTypes = {
  file: PropTypes.object,
  open: PropTypes.bool,
  onJumpToVolume: PropTypes.func,
  // TODO: onJumpToVolume: PropTypes.func.isRequired,
};

export default File;
