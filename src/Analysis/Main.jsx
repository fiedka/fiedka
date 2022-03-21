import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "@coalmines/indui";
import UEFIImage from "./UEFIImage";
import AMDImage from "./AMDImage";
import CBFSImage from "./CBFSImage";
import UnknownImage from "./UnknownImage";

const Main = ({ data, fileName }) => {
  const { amd, cbfs, fmap, intel, uefi } = data;
  const menu = [];
  if (uefi && uefi.Regions && uefi.Regions.length > 0) {
    menu.push({
      id: "uefi",
      body: <UEFIImage data={uefi} fmap={fmap} name={fileName} />,
      label: "UEFI",
    });
  }
  if (amd) {
    menu.push({
      id: "amd",
      body: <AMDImage data={amd} fmap={fmap} name={fileName} />,
      label: "AMD",
    });
  }
  if (cbfs) {
    menu.push({
      id: "cbfs",
      body: <CBFSImage data={cbfs} fmap={fmap} name={fileName} />,
      label: "coreboot",
    });
  }
  // TODO: Add Intel ME support
  if (intel) {
    console.info("Intel inside");
  }
  if (!menu.length) {
    menu.push({
      id: "unknown",
      body: <UnknownImage fmap={fmap} name={fileName} />,
      label: "Unknown",
    });
  }
  return <Tabs menu={menu} />;
};

Main.propTypes = {
  data: PropTypes.exact({
    amd: PropTypes.object,
    fmap: PropTypes.object,
    intel: PropTypes.object,
    uefi: PropTypes.object,
    cbfs: PropTypes.object,
  }),
  fileName: PropTypes.string,
};

export default Main;
