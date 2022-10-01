import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { TextLine } from "@coalmines/indui";
import { hexify } from "../util/hex";

const Directory = forwardRef(function Directory(
  { name, meta, offset, size, files, renderFile },
  ref
) {
  const [expand, setExpand] = useState(true);
  const toggleExpand = () => setExpand(!expand);
  const offs = typeof offset === "number" ? `@${hexify(offset)}` : null;

  return (
    <div ref={ref} className="directory">
      <div onClick={toggleExpand} className="meta">
        <TextLine label={`${meta}, ${files.length} files`}>
          <h3>
            {name} {size}
            {offs}
          </h3>
        </TextLine>
      </div>
      <div className={cn("files", { expand })}>
        {files.map((f, i) => renderFile(f, expand, `${f.id}${i}`))}
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
