import React from "react";
import mftRom from "../util/mft-rom.fixture.json";
import mftEntry from "../util/mft-entry.fixture.json";
import mftEntryNoHeader from "../util/mft-entry-no-header.fixture.json";
import mftEntryNoName from "../util/mft-entry-no-name.fixture.json";
import { transformDir } from "../util/mft";
import t14css from "../util/T14G1AMD_css.json";
import a300css from "../util/A300_css.json";
import { transformAmdFw } from "../util/css";
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

const cssDirs = transformAmdFw(a300css);

export const css1 = () => (
  <MarkedEntriesProvider>
    <PspDir dir={cssDirs[0]} />
  </MarkedEntriesProvider>
);

export const css2 = () => (
  <MarkedEntriesProvider>
    <PspDir dir={cssDirs[1]} />
  </MarkedEntriesProvider>
);

export const css3 = () => (
  <MarkedEntriesProvider>
    <PspDir dir={cssDirs[2]} />
  </MarkedEntriesProvider>
);

const cssDirsT14 = transformAmdFw(t14css);

export const css4 = () => (
  <MarkedEntriesProvider>
    <PspDir dir={cssDirsT14[3]} />
  </MarkedEntriesProvider>
);
