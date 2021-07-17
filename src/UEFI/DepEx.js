import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { getGuidFromDepEx } from "../util/utk";
import { GUIDContext } from "../context/GUIDContext";
import colors from "../util/colors";
import { efiGuids } from "../util/depex";

const DepEx = ({ depEx }) => {
  // GUIDs may appear multuple times, hence can't be used as keys
  const guidContext = useContext(GUIDContext);
  const [contextGuid, setContextGuid] = guidContext;
  return (
    <div className="depex">
      <div className="headline">DepEx</div>
      {depEx
        .filter((d) => !!getGuidFromDepEx(d))
        .map((d, i) => {
          const guid = getGuidFromDepEx(d).toUpperCase();
          const op = d.op;
          const known = efiGuids.find((g) => g.guid === guid);
          const className = classnames("guid-entry", {
            selected: contextGuid === guid,
          });
          const gClassName = classnames("guid", { known });
          return (
            <div
              className={className}
              key={i}
              onClick={() => setContextGuid(guid)}
            >
              &gt; <span className="op">{op}</span>
              <span className={gClassName}>
                {(known && known.name) || guid}
              </span>
            </div>
          );
        })}
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
        .guid-entry {
          cursor: pointer;
          text-align: left;
          padding-left: 4px;
          background-color: #f7f7f7;
        }
        .guid-entry:nth-child(even) {
          background-color: #eeeeee;
        }
        .selected {
          padding-left: 8px;
          color: blue;
        }
        .op {
          margin: 0px 2px;
        }
        .selected .op {
          margin-left: -2px;
        }
        .guid {
          margin: 0px 2px;
          padding: 0 2px;
          color: ${colors[26]};
        }
        .known {
          color: inherit;
        }
      `}</style>
    </div>
  );
};

DepEx.propTypes = {
  depEx: PropTypes.array,
};

export default DepEx;
