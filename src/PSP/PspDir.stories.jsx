import React from "react";
import mftRom from "../util/mft-rom.fixture.json";
import { transformDir } from "../util/mft";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext.js";
import PspDir from "./PspDir";

export default {
  title: "PSP/PspDir",
  component: PspDir,
};

const dir = transformDir(mftRom.Directories[0]);

export const signedAndPacked = () => (
  <MarkedEntriesProvider>
    <PspDir dir={dir} />
  </MarkedEntriesProvider>
);
