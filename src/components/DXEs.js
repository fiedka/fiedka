import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  getGuidFromDepEx,
  getGuidFromDxe,
  getName,
  getDepEx,
  hasName,
} from "../util/dxe-helpers";
import { GUIDContext } from "../context/GUIDContext";
import classnames from "classnames";

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

const DXEs = ({ dxes, open = false }) => {
  const namedDxes = dxes.filter((d) => hasName(d));
  // const namedDxes = dxes.filter((d) => isDxe(d));
  const guidContext = useContext(GUIDContext);
  const [contextGuid] = guidContext;
  return (
    <>
      <ul className={open ? "open" : ""}>
        {namedDxes.map((d) => {
          const guid = getGuidFromDxe(d);
          const name = getName(d);
          const className = classnames("dxe-id", {
            selected: contextGuid === guid,
          });
          return (
            <li key={d.Header.GUID.GUID}>
              {name}
              <div className={className}>{guid}</div>
              {<DepEx depEx={getDepEx(d)} />}
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        ul {
          max-height: 135px;
          overflow: hidden;
        }
        .open {
          max-height: none;
        }
        .selected {
          padding-left: 4px;
          color: blue;
        }
        .dxe-id {
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

DXEs.propTypes = {
  open: PropTypes.bool,
  dxes: PropTypes.array,
};

export default DXEs;
