import React from "react";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import data from "./cbfs.json";
import s76img from "./s76.cbfs.json";
import CBFS from "./CBFS";

export default {
  title: "CBFS/CBFS",
  component: CBFS,
};

export const cbfs = () => (
  <MarkedEntriesProvider>
    <CBFS files={data.Segments} name="image.rom" />
  </MarkedEntriesProvider>
);

export const s76 = () => (
  <MarkedEntriesProvider>
    <CBFS files={s76img.Segments} name="s76-image.rom" />
  </MarkedEntriesProvider>
);
