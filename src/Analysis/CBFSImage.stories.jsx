import React from "react";
import data from "../CBFS/s76.cbfs.json";
import fmap from "../CBFS/s76.fmap.json";
import CBFSImage from "./CBFSImage";

export default {
  title: "CBFS/Image",
  component: CBFSImage,
};

export const s76 = () => (
  <CBFSImage data={data} name="s76-image.rom" fmap={fmap} />
);
