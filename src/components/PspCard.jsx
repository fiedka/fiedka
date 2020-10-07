import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const PspCard = ({ psp }) => {
  const { address, size, sectionType, magic, version, info, md5, sizes } = psp;
  const typeEmoji =
    typeof sectionType === "string" && sectionType.includes("PUBLIC_KEY")
      ? "🔑"
      : null;
  const signed = info.length > 0 && info.find((i) => i.includes("signed"));
  return (
    <>
      <div className="card">
        <header className={cn({ signed })}>
          <span className="type">{typeEmoji}</span>
          {sectionType}
        </header>
        {(magic || version) && (
          <div className="flex-around">
            <span>{magic && `magic: ${magic}`}</span>
            <span>{version && `version ${version}`}</span>
          </div>
        )}
        <div className="flex-around">
          <span>address: {address}</span>
          <span>size: {size}</span>
          <span>hash: {md5}</span>
        </div>
        {info.length > 0 && (
          <div>
            {info.map((i, k) => (
              <span className="info" key={k}>
                {k > 0 && "- "}
                {i}
              </span>
            ))}
          </div>
        )}
        {sizes && (
          <div className="flex-around">
            <span>signed: {sizes.signed}</span>
            <span>uncompressed: {sizes.uncompressed}</span>
            <span>packed: {sizes.packed}</span>
          </div>
        )}
      </div>
      <style jsx>{`
        header {
          background-color: #f7f7f7;
          text-align: center;
          font-weight: bold;
        }
        .signed {
          background-color: #ffe7e7;
        }
        .card {
          border: 1px solid #422384;
          margin: 10px 1%;
          padding: 4px;
          min-width: 200px;
          width: 23%;
        }
        .type {
          margin-right: 16px;
        }
        .flex-around {
          display: flex;
          justify-content: space-around;
        }
        .info {
          color: #303030;
          margin: 2px;
        }
      `}</style>
    </>
  );
};

PspCard.propTypes = {
  psp: PropTypes.object,
};

export default PspCard;
