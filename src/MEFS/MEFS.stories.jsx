import React from "react";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import data from "./fixture_x270.json";
import MEFS from "./MEFS.jsx";

export default {
  title: "MEFS/MEFS",
  component: MEFS,
};

export const mefs = () => (
  <MarkedEntriesProvider>
    <MEFS
      name="x270.rom"
      directories={data.directories}
      entries={data.entries}
    />
  </MarkedEntriesProvider>
);
