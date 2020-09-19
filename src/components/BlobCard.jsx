import React from "react";
import PropTypes from "prop-types";

const BlobCard = ({ guid, type }) => {
  return (
    <>
      <div className="card">
        <span className="type">{type}</span>
        <hr />
        <span className="guid">{guid}</span>
      </div>
      <style jsx>{`
        .card {
          border: 1px solid #422384;
          margin: 10px;
          padding: 4px;
          width: 22%;
        }
        .type {
          background-color: #f1f2f3;
        }
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
};

export default BlobCard;
