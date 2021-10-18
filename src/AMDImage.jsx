import React from "react";
import PropTypes from "prop-types";
import { transformAmdFw } from "./util/css.js";
import { MarkedEntriesProvider } from "./context/MarkedEntriesContext";
import Layout from "./components/Layout";
import FlashUsage from "./components/FlashUsage";
import PspImage from "./PSP/PspImage";

const AMDImage = ({ data, fmap, name }) => {
  const pspDirs = transformAmdFw(data);

  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={fmap} />}>
        <PspImage directories={pspDirs} name={name} />
      </Layout>
    </MarkedEntriesProvider>
  );
};

AMDImage.propTypes = {
  data: PropTypes.object,
  fmap: PropTypes.object,
  name: PropTypes.string,
};

export default AMDImage;
