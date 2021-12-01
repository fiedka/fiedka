import React from "react";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import data from "./cbfs.json";
import CBFS from "./CBFS";

export default {
  title: "CBFS",
  component: CBFS,
};

export const cbfs = () => (
  <MarkedEntriesProvider>
    <CBFS files={data.Segments} name="image.rom" />
  </MarkedEntriesProvider>
);
