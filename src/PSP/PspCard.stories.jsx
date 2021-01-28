import React from "react";
import mftEntry from "../util/mft-entry.fixture.json";
import { transformEntry } from "../util/mft";
import PspCard from "./PspCard";

export default {
  title: "PSP/PspCard",
  component: PspCard,
};

const signedAndPackedEntry = transformEntry(mftEntry);

export const signedAndPacked = () => <PspCard psp={signedAndPackedEntry} />;
