import React, { useContext } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import Tooltip from "../components/Tooltip";
import Blocks from "../components/Blocks";
import Entry from "../components/Entry";
import { PubKeyContext } from "../context/PubKeyContext";
import colors from "../util/colors";

const getSigKey = (info) => {
  const sig = info.find((i) => i.includes("signed"));
  // FIXME: just a quick hack; work on PSPTool to output the full key directly
  if (sig) {
    return sig.substr(7, 4);
  }
};

const shorten = (s) => s && s.substr(0, 8).toUpperCase();

const getMeta = (meta) => {
  if (!meta) {
    return {};
  }
  const signature = shorten(meta.signature);
  const sigFingerprint = shorten(meta.sigFingerprint);
  const encFingerprint = shorten(meta.encFingerprint);
  return { signature, sigFingerprint, encFingerprint };
};

const PspCard = ({ psp, open = true }) => {
  const pubKeyContext = useContext(PubKeyContext);
  const [contextPubKey, setContextPubKey] = pubKeyContext;
  const {
    address,
    size,
    sectionType,
    magic,
    version,
    info,
    md5,
    sizes,
    meta,
  } = psp;

  const entry = { address, length: size };

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

  const { signature, sigFingerprint, encFingerprint } = getMeta(meta);
  const sigKey = getSigKey(info) || sigFingerprint; // TODO
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

  const header = (
    <div
      className={cn("header", {
        selected: signed && selected,
        signed: signed && !selected,
        "signed-verified": signed && verified && !selected,
      })}
    >
      <span className="emoji">{typeEmoji}</span>
      <span className="type">{sectionType}</span>
      <span className="emoji">{infoEmoji}</span>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          padding: 2px 1px;
          cursor: pointer;
          background-color: #4223;
        }
        .selected {
          background-color: ${colors[20]};
        }
        .signed {
          background-color: ${colors[18]};
        }
        .signed-verified {
          background-color: #acab;
        }
        .type {
          background-color: #f7f7f7;
          padding: 0 2px;
        }
        .emoji {
          background-color: #f7f7f7;
          margin: 0 1px;
        }
      `}</style>
    </div>
  );

  return (
    <>
      <Entry header={header} open={open} entry={entry}>
        <div className="flex">
          <table>
            <tbody>
              <tr>
                <th>address</th>
                <td>0x{address.toString(16)}</td>
              </tr>
              <tr>
                <th>hash</th>
                <td>{md5}</td>
              </tr>
              <tr>
                <th>size</th>
                <td>{size}</td>
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
            {signature && <div className="info">signature: {signature}</div>}
            {sigKey && <div className="info">signing key: {sigKey}</div>}
            {encFingerprint && (
              <div className="info">encryption key: {encFingerprint}</div>
            )}
            <div className="info">
              <Blocks size={size} />
            </div>
          </span>
        </div>
      </Entry>
      <style jsx>{`
        .extra {
          display: flex;
          flex-direction: column;
          width: 50%;
          padding: 3px 15px;
        }
        .info {
          margin: 2px;
        }
        .flex {
          display: flex;
          justify-content: space-between;
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
