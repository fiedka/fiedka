import React from "react";
import PropTypes from "prop-types";
import {
  getGuidFromDepEx,
  getGuidFromDxe,
  getName,
  getDepEx,
  hasName,
} from "../util/dxe-helpers";

const DepEx = ({ depEx }) => {
  // GUIDs may appear multuple times, hence can't be used as keys
  return (
    <>
      <div className="depex">
        <div className="headline">DepEx</div>
        {depEx
          .filter((d) => !!getGuidFromDepEx(d))
          .map((d, i) => {
            const guid = getGuidFromDepEx(d);
            return <div key={i}>&gt; {guid}</div>;
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
  return (
    <>
      <ul className={open ? "open" : ""}>
        {namedDxes.map((d) => (
          <li key={d.Header.GUID.GUID}>
            {getName(d)}
            <div className="dxe-id">{getGuidFromDxe(d)}</div>
            {<DepEx depEx={getDepEx(d)} />}
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          max-height: 135px;
          overflow: hidden;
        }
        .open {
          max-height: none;
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
