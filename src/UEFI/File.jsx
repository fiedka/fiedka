import React, { useContext, useState } from "react";
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
  const [annotating, setAnnotating] = useState(false);
  const [annotation, setAnnotation] = useState("");
  const { removeFile, removals } = useContext(EditContext);
  // TODO...
  const { guid, name, size, checksum, fileType, depEx } = file;

  const toggleAnnotate = (e) => {
    e.stopPropagation();
    setAnnotating(!annotating);
  };

  const onAnnotate = (e) => setAnnotation(e.target.value);

  const rm = async (e) => {
    e.stopPropagation();
    removeFile({ guid, name });
  };

  const removing = !!removals.find((r) => r.guid === guid);

  const typeEmoji =
    fileType === "driver" ? <Tooltip tip="driver">🚗</Tooltip> : null;
  const infoEmoji =
    guid === "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF" ? null : (
      <span>
        <button onClick={toggleAnnotate}>
          {annotation.length ? "📝" : "🗒️"}
        </button>
        <button onClick={rm}>{removing ? "🔥" : "🗑️"}</button>
      </span>
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
      {annotating ? (
        <div className="content">
          <textarea onChange={onAnnotate} value={annotation} />
          {annotation.length === 0 && <span className="floaty">✏️</span>}
        </div>
      ) : (
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
      )}
      <style jsx>{`
        .content {
          position: relative;
          height: 100%;
        }
        .floaty {
          position: absolute;
          top: 6px;
          left: 12px;
          pointer-events: none;
        }
        textarea {
          width: 100%;
          height: 100%;
          min-height: 100px;
          border: 0;
          padding: 6px;
          resize: none;
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
