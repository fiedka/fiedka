import React from "react";
import mftRom from "../util/mft-rom.fixture.json";
import mftEntry from "../util/mft-entry.fixture.json";
import mftEntryNoHeader from "../util/mft-entry-no-header.fixture.json";
import mftEntryNoName from "../util/mft-entry-no-name.fixture.json";
import { transformDir } from "../util/mft";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext.js";
import PspDir from "./PspDir";

export default {
  title: "PSP/PspDir",
  component: PspDir,
};

const dir = transformDir(mftRom.Directories[0]);

export const empty = () => (
  <MarkedEntriesProvider>
    <PspDir dir={dir} />
  </MarkedEntriesProvider>
);

const entries = [mftEntry, mftEntryNoHeader, mftEntryNoName];
const dirWithEntries = transformDir({
  ...mftRom.Directories[0],
  Entries: entries,
});

export const withEntries = () => (
  <MarkedEntriesProvider>
    <PspDir dir={dirWithEntries} />
  </MarkedEntriesProvider>
);
