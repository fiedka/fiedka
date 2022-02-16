import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { TextLine } from "@coalmines/indui";

const Directory = forwardRef(function Directory(
  { name, meta, files, renderFile },
  ref
) {
  const [expand, setExpand] = useState(true);
  const toggleExpand = () => setExpand(!expand);

  return (
    <div ref={ref} className="directory">
      <div onClick={toggleExpand} className="meta">
        <TextLine label={`${meta}, ${files.length} files`}>
          <h3>{name}</h3>
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
  files: PropTypes.array,
  renderFile: PropTypes.func,
};

export default Directory;
