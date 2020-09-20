import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import DXEs from "./DXEs";
import { GUIDContext } from "../context/GUIDContext";

const BlobCard = ({ guid, type, name, dxes }) => {
  const [openDxes, setOpenDxes] = useState(false);
  const guidContext = useContext(GUIDContext);
  const [contextGuid, setContextGuid] = guidContext;
  const className = classnames("card", { selected: contextGuid === guid });
  const icon = (openDxes && "/^\\") || "\\V/";
  return (
    <>
      <div className={className}>
        <span className="type">{type}</span>
        <hr />
        {name && <div className="name">{name}</div>}
        <div onClick={() => setContextGuid(guid)} className="guid">
          {guid}
        </div>
        {(dxes.length && (
          <div className="expand">
            <button onClick={() => setOpenDxes(!openDxes)}>
              {icon} DXES: {dxes.length} {icon}
            </button>
          </div>
        )) ||
          ""}
        {(dxes.length && <DXEs open={openDxes} dxes={dxes} />) || ""}
      </div>
      <style jsx>{`
        .card {
          border: 1px solid #422384;
          margin: 10px 1%;
          padding: 4px;
          min-width: 600px;
          width: 48%;
        }
        .type {
          background-color: #f1f2f3;
        }
        .name {
          color: #c02020;
        }
        .name,
        .guid {
          font-weight: bold;
          text-align: right;
          font-size: 12px;
        }
        .selected {
          padding-left: 4px;
          color: blue;
        }
        .expand {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        button {
          width: 80%;
        }
      `}</style>
    </>
  );
};

BlobCard.propTypes = {
  guid: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  dxes: PropTypes.array,
};

export default BlobCard;
