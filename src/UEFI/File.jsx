import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Boop } from "@coalmines/indui";
import Tooltip from "../components/Tooltip";
import Blocks from "../components/Blocks";
import Entry from "../components/Entry";
import DepEx from "./DepEx";
import { EditContext } from "./EditContext";

// TODO: Handle multiple FVs? Is it possible?
export const getFviGuid = (file) => {
  const fv = file.childFvs && file.childFvs[0];
  if (fv) {
    return fv.guid;
  }
};

const File = ({ file, open, onJumpToVolume }) => {
  const { removeFile, removals } = useContext(EditContext);
  // TODO...
  const { guid, name, size, checksum, fileType, depEx } = file;

  const rm = async (e) => {
    e.stopPropagation();
    removeFile({ guid, name });
  };

  const removing = !!removals.find((r) => r.guid === guid);

  const typeEmoji =
    fileType === "driver" ? <Tooltip tip="driver">🚗</Tooltip> : null;
  const infoEmoji =
    guid === "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF" ? null : (
      <button onClick={rm}>{removing ? "🔥" : "🗑️"}</button>
    );
  const headline = name || guid.toUpperCase();
  const header = (
    <div className="header">
      <span className="emoji">{typeEmoji}</span>
      <span className="guid">{headline}</span>
      <span className="emoji">{infoEmoji}</span>
      <style jsx>{`
        .header {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          padding: 2px 1px;
          cursor: pointer;
          background-color: #4223;
        }
        .guid {
          display: inline-flex;
          align-items: center;
          background-color: #f7f7f7;
          padding: 0 2px;
          color: #000;
        }
        .emoji {
          background-color: #f7f7f7;
          margin: 0 1px;
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
      <div className="content">
        {depEx && depEx.length > 0 && <DepEx depEx={depEx} />}
        {name && <div>guid: {guid.toUpperCase()}</div>}
        <span>type: {fileType}</span>
        <div>size: {size}</div>
        <div>checksum: {JSON.stringify(checksum)}</div>
        <Blocks size={size} />
        {file.childFvs.length > 0 && (
          <Boop onClick={jumpToVolume}>Jump to firmware volume</Boop>
        )}
      </div>
      <style jsx>{`
        .content {
          position: relative;
          height: 100%;
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
