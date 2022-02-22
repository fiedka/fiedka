import React from "react";
import PropTypes from "prop-types";
import { Tabs, TextLine } from "@coalmines/indui";
import UEFIImage from "../UEFIImage";
import AMDImage from "../AMDImage";
import CBFSImage from "../CBFSImage";

const Main = ({ data, fileName }) => {
  const { amd, cbfs, fmap, intel, uefi } = data;
  const menu = [];
  if (uefi) {
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
    return <TextLine>No firmware detected</TextLine>;
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
