import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const Directory = ({ headline, files, renderFile }) => {
  const [expand, setExpand] = useState(true);
  const toggleExpand = () => setExpand(!expand);
  return (
    <>
      <div className="directory">
        <h3 onClick={toggleExpand}>
          {headline}
          <span>{files.length} files</span>
        </h3>
        <div className={cn("files", { expand })}>
          {files.map((f) => renderFile(f, expand))}
        </div>
      </div>
      <style jsx>{`
        .directory {
          border: 1px dashed #800020;
          padding: 0 3px;
          margin: 5px 5px 8px;
        }
        h3 {
          display: flex;
          justify-content: space-around;
          background-color: #dffcdf;
          margin: 10px 8px;
          padding: 3px;
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
    </>
  );
};

Directory.propTypes = {
  headline: PropTypes.node,
  files: PropTypes.array,
  renderFile: PropTypes.func,
};

export default Directory;
