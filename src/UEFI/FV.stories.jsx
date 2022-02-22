import React from "react";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";
import { EditProvider } from "./EditContext";
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
  <EditProvider>
    <MarkedEntriesProvider>
      <FV {...fv} ffs={fv.files} onJumpToFV={action("jump to fv")} />
    </MarkedEntriesProvider>
  </EditProvider>
);

FirmwareVolume.propTypes = {
  fv: PropTypes.object,
};

export const emptyVolume = () => <FirmwareVolume fv={fvs[0]} />;

export const dxeVolume = () => <FirmwareVolume fv={fvs[2]} />;

export const peiVolume = () => <FirmwareVolume fv={fvs[1]} />;

export const peiParentVolume = () => <FirmwareVolume fv={fvs[3]} />;
