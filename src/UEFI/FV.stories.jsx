import React from "react";
import { action } from "@storybook/addon-actions";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import { getFVs } from "../util/utk";
import data from "./uefi.json";
import FV from "./FV";

export default {
  title: "UEFI/FV",
  component: FV,
};

const fvs = getFVs(data);

const FirmwareVolume = ({ fv }) => (
  <MarkedEntriesProvider>
    <FV {...fv} ffs={fv.files} onJumpToFV={action("jump to fv")} />
  </MarkedEntriesProvider>
);

export const emptyVolume = () => <FirmwareVolume fv={fvs[0]} />;

export const dxeVolume = () => <FirmwareVolume fv={fvs[2]} />;

export const peiVolume = () => <FirmwareVolume fv={fvs[1]} />;

export const peiParentVolume = () => <FirmwareVolume fv={fvs[3]} />;
