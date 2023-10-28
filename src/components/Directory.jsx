import React, { forwardRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { TextLine } from "@coalmines/indui";
import { MarkedEntriesContext } from "../context/MarkedEntriesContext";
import { hexify } from "../util/hex";

const Directory = forwardRef(function Directory(
  { name, meta, offset, size, files, renderFile: File },
  ref
) {
  const [expand, setExpand] = useState(true);
  const { setHoveredEntry } = useContext(MarkedEntriesContext);

  const toggleExpand = () => setExpand(!expand);
  const offs = typeof offset === "number" ? `@${hexify(offset)}` : null;
  const entry = { address: offset, length: size };

  const clearEntry = () => {
    setHoveredEntry(null);
  };

  const setEntry = () => {
    setHoveredEntry(entry);
  };

  return (
    <div ref={ref} className="directory">
      <div
        onClick={toggleExpand}
        onMouseOver={setEntry}
        onMouseOut={clearEntry}
        className="meta"
      >
        <TextLine label={`${meta}, ${files.length} files`}>
          <h3>
            {name} {size}
            {offs}
          </h3>
        </TextLine>
      </div>
      <div className={cn("files", { expand })}>
        {files.map((f, i) => (
          <File file={f} open={expand} key={`${f.id}${i}`} />
        ))}
      </div>
      <style jsx>{`
        .directory {
          margin: 16px 3px;
        }
        .meta {
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .files {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 10px;
        }
        .files.expand {
          padding: 0;
        }
      `}</style>
    </div>
  );
});

Directory.propTypes = {
  name: PropTypes.string,
  meta: PropTypes.string,
  offset: PropTypes.number,
  size: PropTypes.number,
  files: PropTypes.array,
  renderFile: PropTypes.func,
};

export default Directory;
