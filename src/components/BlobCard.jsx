import React, { useState } from "react";
import PropTypes from "prop-types";
import DXEs from "./DXEs";

const BlobCard = ({ guid, type, name, dxes }) => {
  const [openDxes, setOpenDxes] = useState(false);
  return (
    <>
      <div className="card">
        <span className="type">{type}</span>
        <hr />
        {name && <div className="name">{name}</div>}
        <span className="guid">{guid}</span>
        {dxes && (
          <>
            <button onClick={() => setOpenDxes(!openDxes)}>
              expand DXE blobs
            </button>
            <DXEs open={openDxes} dxes={dxes} />
          </>
        )}
      </div>
      <style jsx>{`
        .card {
          border: 1px solid #422384;
          margin: 10px;
          padding: 4px;
          min-width: 320px;
          width: 22%;
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
        }
      `}</style>
    </>
  );
};

BlobCard.propTypes = {
  guid: PropTypes.string,
  type: PropTypes.number,
  name: PropTypes.string,
  dxes: PropTypes.array,
};

export default BlobCard;
