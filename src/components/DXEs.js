import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import {
  getGuidFromDxe,
  getName,
  getDepEx,
  hasName,
} from "../util/dxe-helpers";
import { GUIDContext } from "../context/GUIDContext";
import DepEx from "./DepEx";

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
