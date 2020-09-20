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
  return (
    <>
      <div className="depex">
        <div className="headline">DepEx</div>
        {depEx
          .filter((d) => !!getGuidFromDepEx(d))
          .map((d) => {
            const guid = getGuidFromDepEx(d);
            return <div key={guid}>&gt; {guid}</div>;
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

const DXEs = ({ dxes, open }) => {
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
  open: PropTypes.boolean,
  dxes: PropTypes.array,
};

export default DXEs;
