import React from "react";
import amdData3_60 from "./A3MSTX_3.60.amd.json";
import fmap3_60 from "./A3MSTX_3.60.fmap.json";
import amdData3_60K from "./A3MSTX_3.60K.amd.json";
import fmap3_60K from "./A3MSTX_3.60K.fmap.json";
import AMDImage from "./AMDImage";

export default {
  title: "AMD/AMDImage",
  component: AMDImage,
};

export const A3MSTX_3_60 = () => {
  return <AMDImage name="A3MSTX_3.60" data={amdData3_60} fmap={fmap3_60} />;
};

export const A3MSTX_3_60K = () => {
  return <AMDImage name="A3MSTX_3.60K" data={amdData3_60K} fmap={fmap3_60K} />;
};
