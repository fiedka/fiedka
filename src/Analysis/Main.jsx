import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Tabs } from "@coalmines/indui";
import UEFIImage from "./UEFIImage";
import AMDImage from "./AMDImage";
import CBFSImage from "./CBFSImage";
import UnknownImage from "./UnknownImage";
import { selectUefi } from "../UEFI/store";
import { selectAmd } from "../PSP/store";
import { selectCbfs } from "../CBFS/store";
import { selectFmap } from "../Flash/store";

const Main = ({ fileName }) => {
  const uefi = useSelector(selectUefi);
  const amd = useSelector(selectAmd);
  const cbfs = useSelector(selectCbfs);
  const fmap = useSelector(selectFmap);
  const intel = null;
  const menu = [];
  if (uefi && uefi.fvs && uefi.fvs.length > 0) {
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
  fileName: PropTypes.string,
};

export default Main;
