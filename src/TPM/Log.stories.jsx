import React from "react";
import lemp10data from "./lemp10-tpm20.json";
import t14data from "./t14-tpm20.json";
import data from "./data.json";
import TPMLog, { transform } from "./Log";

export default {
  title: "TPM/Log",
  component: TPMLog,
};

const stripEvent = (e) => {
  if (typeof e !== "string") {
    return e;
  }
  // escape all non-printable chars, i.e., below 0x20 (see `man ascii`)
  // wrap in `[]` to make clear that those are escaped
  return e
    .replace(/\0/g, "") // just remove zero bytes
    .split("")
    .map((c) =>
      c.charCodeAt(0) < 0x20 ? `[0x${c.charCodeAt(0).toString(16)}]` : c
    )
    .join("");
};

const t = ({ PcrList }) =>
  PcrList.map(({ data, type, digest, digests, pcrIndex }, id) => ({
    event: stripEvent(data),
    type,
    digests: digests || [{ algorithm: null, digest }],
    id,
    pcr: pcrIndex,
  }));

export const lemp10 = () => <TPMLog events={t(lemp10data)} />;

// export const sample = () => <TPMLog events={transform(data)} />;

export const t14 = () => <TPMLog events={t(t14data)} />;
