import React, { useContext } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { PubKeyContext } from "../context/PubKeyContext";

const getSig = (info) => {
  // FIXME: just a quick hack
  const sig = info.find((i) => i.includes("signed"));
  if (sig) {
    return sig.substr(7, 4);
  }
};

const PspCard = ({ psp }) => {
  const pubKeyContext = useContext(PubKeyContext);
  const [contextPubKey, setContextPubKey] = pubKeyContext;
  const { address, size, sectionType, magic, version, info, md5, sizes } = psp;

  const isKey =
    typeof sectionType === "string" && sectionType.includes("PUBLIC_KEY");
  const pubKey = isKey ? magic : null; // for some reason, the magic number is the public key
  const typeEmoji = isKey ? "🔑" : null;
  const setPubKey = () => {
    if (isKey) {
      setContextPubKey(pubKey);
    }
  };

  const sig = getSig(info);
  const signed = typeof sig === "string";
  const selected = contextPubKey && sig === contextPubKey;

  const infoEmoji = [];
  if (info.find((i) => i.includes("compressed"))) {
    infoEmoji.push("📦");
  }
  if (info.find((i) => i.includes("verified"))) {
    infoEmoji.push("✅");
  }
  if (info.find((i) => i.includes("encrypted"))) {
    infoEmoji.push("🔐");
  }
  if (info.find((i) => i.includes("legacy"))) {
    infoEmoji.push("🏚️");
  }

  return (
    <>
      <div className={cn("card", { selected })}>
        <header onClick={setPubKey} className={cn({ signed })}>
          <span>{typeEmoji}</span>
          <span className="type">{sectionType}</span>
          <span>{infoEmoji}</span>
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
        .selected {
          background-color: #e7ffe7;
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
          margin: 0 16px;
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
