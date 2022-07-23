import React from "react";
import PropTypes from "prop-types";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import Layout from "../components/Layout";
import SidePane from "../components/SidePane";
import FlashUsage from "../components/FlashUsage";
import PspImage from "../PSP/PspImage";

const AMDImage = ({ data, fmap, name }) => {
  const { dirs } = data;

  return (
    <MarkedEntriesProvider>
      <Layout
        sidepane={
          <SidePane>
            <FlashUsage usage={fmap} />
          </SidePane>
        }
      >
        <PspImage directories={dirs} name={name} />
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
