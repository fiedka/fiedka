import React from "react";
import { action } from "@storybook/addon-actions";
import UEFIImage from "./UEFIImage";
import fmapData from "../components/flashUsage.json";
import uefiData from "../UEFI/uefi.json";
import { UtkContext } from "../context/UtkContext";

export default {
  title: "UEFI/Image",
  component: UEFIImage,
};

export const image = () => (
  <UtkContext.Provider value={{ remove: action("remove") }}>
    <UEFIImage data={uefiData} fmap={fmapData} name="OVMF" />
  </UtkContext.Provider>
);
