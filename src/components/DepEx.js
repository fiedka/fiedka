import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { getGuidFromDepEx } from "../util/dxe-helpers";
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
            const guid = getGuidFromDepEx(d);
            const className = classnames({ selected: contextGuid === guid });
            return (
              <div
                className={className}
                key={i}
                onClick={() => setContextGuid(guid)}
              >
                &gt; {guid}
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
        .selected {
          padding-left: 4px;
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
