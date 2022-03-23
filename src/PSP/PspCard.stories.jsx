import React from "react";
import mftEntry from "../util/mft-entry.fixture.json";
import mftEntryNoHeader from "../util/mft-entry-no-header.fixture.json";
import mftEntryNoName from "../util/mft-entry-no-name.fixture.json";
import { transformEntry } from "../util/mft";
import PCard from "./PspCard";

export default {
  title: "PSP/PspCard",
  component: PCard,
};

const PspCard = (p) => (
  <div style={{ width: 480 }}>
    <PCard {...p} />
  </div>
);

export const signedAndPacked = () => <PspCard psp={transformEntry(mftEntry)} />;

export const noHeader = () => (
  <PspCard psp={transformEntry(mftEntryNoHeader)} />
);

export const noName = () => <PspCard psp={transformEntry(mftEntryNoName)} />;
