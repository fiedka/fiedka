import React, { useContext } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import Tooltip from "../components/Tooltip";
import Blocks from "../components/Blocks";
import Entry from "../components/Entry";
import { PubKeyContext } from "../context/PubKeyContext";
import colors from "../util/colors";

export const hexify = (a) => a && `0x${a.toString(16)}`;

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

const Extra = ({ label, data }) =>
  data ? (
    <tr>
      <th>{label}</th>
      <td>{data}</td>
      <style jsx>{`
        th {
          text-align: left;
          padding-left: 0;
        }
      `}</style>
    </tr>
  ) : null;

Extra.propTypes = {
  label: PropTypes.string,
  data: PropTypes.string,
};

const Header = ({
  info,
  selected,
  sectionType,
  destinationAddress,
  setPubKey,
}) => {
  const typeEmoji = isKey(sectionType) ? (
    <span onClick={setPubKey}>🔑</span>
  ) : null;
  const signed = typeof sigKey === "string";
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
  if (destinationAddress) {
    infoEmoji.push(
      <Tooltip key="boot" tip="boot entry">
        🥾
      </Tooltip>
    );
  }

  // FIXME: .header width: 100% should not be necessary; setup issue?!
  // TL;DR of digging through issues: It's hard to figure out the Babel config
  // subset from the Next.js monorepo which handles styled-jsx correctly.
  // We probably need to migrate away from styled-jsx. It's caused too much
  // trouble already, also with @coalmines/indui, and styled-components
  // offers a sensible alternative.
  return (
    <div
      className={cn("pspcard-header", {
        selected: signed && selected,
        signed: signed && !selected,
        "signed-verified": signed && verified && !selected,
      })}
    >
      <span className="emoji">{typeEmoji}</span>
      <span className="type">{sectionType}</span>
      <span className="emoji">{infoEmoji}</span>
      <style jsx>{`
        .pspcard-header {
          width: 100%;
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
};

Header.propTypes = {
  info: PropTypes.array,
  selected: PropTypes.bool,
  setPubKey: PropTypes.func,
  sectionType: PropTypes.string,
  destinationAddress: PropTypes.number,
};

const isKey = (sectionType) =>
  typeof sectionType === "string" && sectionType.includes("PUBLIC_KEY");

const PspCard = ({ psp, open = true }) => {
  const pubKeyContext = useContext(PubKeyContext);
  const [contextPubKey, setContextPubKey] = pubKeyContext;
  const {
    address,
    destinationAddress,
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

  // FIXME: for some reason, the magic number is the public key
  const pubKey = isKey(sectionType) ? magic : null;
  const setPubKey = (e) => {
    e.stopPropagation();
    if (isKey) {
      setContextPubKey(pubKey);
    }
  };
  const { signature, sigFingerprint, encFingerprint } = getMeta(meta);
  const sigKey = getSigKey(info) || sigFingerprint; // TODO
  const selected = contextPubKey && sigKey === contextPubKey;

  const header = (
    <Header
      info={info}
      selected={selected}
      sectionType={sectionType}
      destinationAddress={destinationAddress}
      setPubKey={setPubKey}
    />
  );

  return (
    <Entry header={header} open={open} entry={entry}>
      <div className="flex">
        <table>
          <tbody>
            <tr>
              <th>address</th>
              <td>0x{address.toString(16)}</td>
            </tr>
            <tr>
              <th>destination</th>
              <td>{hexify(destinationAddress)}</td>
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
          <table>
            <tbody>
              <Extra data={version} label="version" />
              <Extra data={magic} label="magic" />
              <Extra data={signature} label="signature" />
              <Extra data={sigKey} label="signing key" />
              <Extra data={encFingerprint} label="encryption key" />
            </tbody>
          </table>
          <div className="info">
            <Blocks size={size} />
          </div>
        </span>
      </div>
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
    </Entry>
  );
};

PspCard.propTypes = {
  psp: PropTypes.object,
  open: PropTypes.bool,
};

export default PspCard;
