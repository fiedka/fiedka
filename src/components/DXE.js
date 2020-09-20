import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { GUIDContext } from "../context/GUIDContext";
import DepEx from "./DepEx";

const DXE = ({ guid, name, depEx }) => {
  const [active, setActive] = useState(false);
  const guidContext = useContext(GUIDContext);
  const [contextGuid] = guidContext;
  const className = classnames("guid", {
    selected: contextGuid === guid,
  });
  return (
    <>
      <li className={classnames({ activeBorder: active })}>
        <button onClick={() => setActive(!active)}>
          <div className="name">{name}</div>
          <div className={className}>{guid}</div>
        </button>
        {<DepEx depEx={depEx} />}
      </li>
      <style>{`
        li {
          width: 48%;
          margin: 4px 1%;
          padding: 6px;
          border: 2px dotted #f9fafa;
        }
        li.activeBorder {
          border-color: #f94040;
        }
        button {
          font-weight: bold;
          width: 100%;
        }
        .name {
          margin: 2px;
          font-weight: normal;
        }
        .guid {
          text-align: right;
          font-size: 10px;
        }
        .active {
          color: red;
        }
        .selected {
          padding-left: 4px;
          color: blue;
        }
      `}</style>
    </>
  );
};

DXE.propTypes = {
  guid: PropTypes.string,
  name: PropTypes.string,
  depEx: PropTypes.array,
};

export default DXE;
