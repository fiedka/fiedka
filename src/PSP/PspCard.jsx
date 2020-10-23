import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import colors from "../util/colors";
import Tooltip from "../components/Tooltip";
import { UsedBlock } from "../components/FlashUsage";
import { PubKeyContext } from "../context/PubKeyContext";
import { MarkedEntriesContext } from "../context/MarkedEntriesContext";

const getSigKey = (info) => {
  const sig = info.find((i) => i.includes("signed"));
  // FIXME: just a quick hack; work on PSPTool to output the key directly
  if (sig) {
    return sig.substr(7, 4);
  }
};

const PspCard = ({ psp, open = true }) => {
  const [active, setActive] = useState(false);
  const pubKeyContext = useContext(PubKeyContext);
  const markedEntriesContext = useContext(MarkedEntriesContext);
  const [contextPubKey, setContextPubKey] = pubKeyContext;
  const { address, size, sectionType, magic, version, info, md5, sizes } = psp;

  const entry = { address, length: size };
  const onSelect = () => {
    if (!active) {
      markedEntriesContext.addEntry(entry);
    } else {
      markedEntriesContext.removeEntry(entry);
    }
    setActive(!active);
  };
  const onHover = () => {
    markedEntriesContext.setHoveredEntry(entry);
  };
  const onOut = () => {
    markedEntriesContext.setHoveredEntry(null);
  };

  const isKey =
    typeof sectionType === "string" && sectionType.includes("PUBLIC_KEY");
  const pubKey = isKey ? magic : null; // for some reason, the magic number is the public key
  const setPubKey = (e) => {
    e.stopPropagation();
    if (isKey) {
      setContextPubKey(pubKey);
    }
  };
  const typeEmoji = isKey ? <span onClick={setPubKey}>🔑</span> : null;

  const sigKey = getSigKey(info);
  const signed = typeof sigKey === "string";
  const selected = contextPubKey && sigKey === contextPubKey;
  const verified = info.find((i) => i.includes("verified"));

  const infoEmoji = [];
  if (verified) {
    infoEmoji.push(
      <Tooltip key="verified" tip="verified">
        ✅
      </Tooltip>
    );
  }
  if (signed && !verified) {
    infoEmoji.push(
      <Tooltip key="unverified" tip="unverified">
        ⚠️
      </Tooltip>
    );
  }
  if (info.find((i) => i.includes("encrypted"))) {
    infoEmoji.push(
      <Tooltip key="encrypted" tip="encrypted">
        🔐
      </Tooltip>
    );
  }
  if (info.find((i) => i.includes("compressed"))) {
    infoEmoji.push(
      <Tooltip key="compressed" tip="compressed">
        📦
      </Tooltip>
    );
  }
  if (info.find((i) => i.includes("legacy"))) {
    infoEmoji.push(
      <Tooltip key="legacy" tip="legacy header">
        🏚️
      </Tooltip>
    );
  }

  const blockSize = 4096;
  const maxBlockCount = 42;
  const blockCount = 1 + Math.floor(size / blockSize);
  const blockDisplay = Math.min(maxBlockCount, blockCount);
  const blocks = (
    <>
      <h4>blocks used: {blockCount}</h4>
      <div className="blocks">
        {Array.from({ length: blockDisplay }, (_, i) => (
          <UsedBlock key={i} />
        ))}
        {blockCount > maxBlockCount && "…"}
      </div>
      <style jsx>{`
        h4 {
          margin: 3px 0;
        }
        .blocks {
          display: flex;
          flex-wrap: wrap;
          max-width: 120px;
          line-height: 8px;
        }
      `}</style>
    </>
  );

  return (
    <>
      <div
        className={cn("card", { active, open })}
        onClick={onSelect}
        onMouseOver={onHover}
        onMouseLeave={onOut}
      >
        <header
          className={cn({
            selected: signed && selected,
            signed: signed && !selected,
          })}
        >
          <span className="emoji">{typeEmoji}</span>
          <span className="type">{sectionType}</span>
          <span className="emoji">{infoEmoji}</span>
        </header>
        <main>
          <table>
            <tbody>
              <tr>
                <th>address</th>
                <td>0x{address.toString(16)}</td>
              </tr>
              <tr>
                <th>size</th>
                <td>{size}</td>
              </tr>
              <tr>
                <th>hash</th>
                <td>{md5}</td>
              </tr>
              {sizes && (
                <>
                  <tr>
                    <th>signed</th>
                    <td>{sizes.signed}</td>
                  </tr>
                  <tr>
                    <th>uncompressed</th>
                    <td>{sizes.uncompressed}</td>
                  </tr>
                  <tr>
                    <th>packed</th>
                    <td>{sizes.packed}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <span className="extra">
            {version && <div className="info">version {version}</div>}
            {magic && <div className="info">magic: {magic}</div>}
            {sigKey && <div className="info">signature: {sigKey}</div>}
            <div className="info">{blocks}</div>
          </span>
        </main>
      </div>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          padding: 2px 1px;
          background-color: ${colors[0]};
          text-align: center;
          font-weight: bold;
          cursor: pointer;
        }
        .open main {
          max-height: 400px;
          padding: 3px;
        }
        main {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.2s ease-in, padding 0.2s ease;
          padding: 0;
          display: flex;
          flex: 1;
          justify-content: space-between;
          font-family: sans-serif;
          background-color: #eee;
          cursor: pointer;
        }
        .selected {
          background-color: ${colors[20]};
        }
        .signed {
          background-color: ${colors[18]};
        }
        .card.open {
          margin: 10px 1%;
        }
        .card {
          display: flex;
          flex-direction: column;
          border: 1px solid #422384;
          margin: 10px 1% 0;
          padding: 4px;
          min-width: 350px;
          width: 48%;
        }
        .card:hover {
          background-color: ${colors[2]};
        }
        .card.active:hover {
          background-color: ${colors[4]};
        }
        .active {
          background-color: ${colors[6]};
        }
        .type {
          background-color: #f7f7f7;
          padding: 0 2px;
        }
        .emoji {
          background-color: #f7f7f7;
          margin: 0 1px;
        }
        .extra {
          display: flex;
          flex-direction: column;
          width: 50%;
          padding: 3px 15px;
        }
        .info {
          margin: 2px;
        }
      `}</style>
    </>
  );
};

PspCard.propTypes = {
  psp: PropTypes.object,
  open: PropTypes.bool,
};

export default PspCard;
