import React from "react";
import PropTypes from "prop-types";

import Blocks from "../components/Blocks";
import Entry from "../components/Entry";

const uiName = "User interface name";

const File = ({ file, open }) => {
  const { guid, name, size, fileType, sections } = file;
  const uiNameSection = sections.find((s) => s.sectionType === uiName);
  const headline = uiNameSection ? uiNameSection.name : guid;
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
  const jumpToVolume = () => {
    // TODO
  };
  return (
    <Entry open={open} entry={{ address: 0, size }} header={header}>
      <div>
        {name && <span>{name}</span>}
        {uiNameSection && <div>guid: {guid}</div>}
        <span>type: {fileType}</span>
        <div>size: {size}</div>
        <Blocks size={size} />
        {fileType === "firmware volume image" && (
          <button onClick={jumpToVolume}>Jump to firmware volume</button>
        )}
      </div>
    </Entry>
  );
};

File.propTypes = {
  file: PropTypes.object,
  open: PropTypes.boolean,
};

export default File;
