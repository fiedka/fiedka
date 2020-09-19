import React, { useState } from "react";
import PropTypes from "prop-types";

const hasName = (d) => d.Sections && d.Sections.find((s) => s.Name);

const getName = (d) => {
  const section = d.Sections.find((s) => s.Name);
  return section.Name;
};

const DXEs = ({ dxes }) => {
  const [open, setOpen] = useState(false);
  const namedDxes = dxes.filter((d) => hasName(d));
  return (
    <>
      <ul className={open ? "open" : ""} onClick={() => setOpen(!open)}>
        {namedDxes.map((d) => (
          <li key={d.Header.GUID.GUID}>{getName(d)}</li>
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
      `}</style>
    </>
  );
};

DXEs.propTypes = {
  dxes: PropTypes.array,
};

const BlobCard = ({ guid, type, name, dxes }) => {
  return (
    <>
      <div className="card">
        <span className="type">{type}</span>
        <hr />
        {name && <div className="name">{name}</div>}
        <span className="guid">{guid}</span>
        {dxes && <DXEs dxes={dxes} />}
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
