import React from "react";
import pspData1 from "./A3MSTX_3.60.psp.json";
import pspData2 from "./A3MSTX_3.60K.psp.json";
import PspImage from "./PspImage";

export default {
  title: "PSP/PspImage",
  component: PspImage,
};

export const PSP1 = () => {
  return <PspImage name="A3MSTX_3.60" directories={pspData1} />;
};

export const PSP2 = () => {
  return <PspImage name="A3MSTX_3.60K" directories={pspData2} />;
};
