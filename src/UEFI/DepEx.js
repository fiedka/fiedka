import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { getGuidFromDepEx } from "../util/utk";
import { GUIDContext } from "../context/GUIDContext";

const DepEx = ({ depEx }) => {
  // GUIDs may appear multuple times, hence can't be used as keys
  const guidContext = useContext(GUIDContext);
  const [contextGuid, setContextGuid] = guidContext;
  return (
    <>
      <div className="depex">
        <div className="headline">DepEx</div>
        {depEx
          .filter((d) => !!getGuidFromDepEx(d))
          .map((d, i) => {
            const guid = getGuidFromDepEx(d).toUpperCase();
            const op = d.op;
            const className = classnames("guid", {
              selected: contextGuid === guid,
            });
            return (
              <div
                className={className}
                key={i}
                onClick={() => setContextGuid(guid)}
              >
                &gt; {guid} {op}
              </div>
            );
          })}
      </div>
      <style jsx>{`
        .depex {
          background-color: #f0fcfd;
          padding: 3px;
          font-family: monospace;
          font-size: 11px;
        }
        .headline {
          text-align: center;
          font-weight: bold;
        }
        .guid {
          cursor: pointer;
          text-align: left;
          padding-left: 4px;
          background-color: #f7f7f7;
        }
        .guid:nth-child(even) {
          background-color: #eeeeee;
        }
        .selected {
          padding-left: 8px;
          color: blue;
        }
      `}</style>
    </>
  );
};

DepEx.propTypes = {
  depEx: PropTypes.array,
};

export default DepEx;
