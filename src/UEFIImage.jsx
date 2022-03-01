import React from "react";
import PropTypes from "prop-types";
import { getFVs } from "./util/utk";
import { MarkedEntriesProvider } from "./context/MarkedEntriesContext";
import { GUIDProvider } from "./context/GUIDContext";
import Layout from "./components/Layout";
import SidePane from "./components/SidePane";
import FlashUsage from "./components/FlashUsage";
import FirmwareVolumes from "./UEFI/FirmwareVolumes";

const UEFIImage = ({ data, fmap, name }) => {
  const fvs = getFVs(data);

  return (
    <MarkedEntriesProvider>
      <Layout
        sidepane={
          <SidePane>
            <FlashUsage usage={fmap} />
          </SidePane>
        }
      >
        <GUIDProvider>
          <FirmwareVolumes fvs={fvs} name={name} />
        </GUIDProvider>
      </Layout>
    </MarkedEntriesProvider>
  );
};

UEFIImage.propTypes = {
  data: PropTypes.object,
  fmap: PropTypes.object,
  name: PropTypes.string,
};

export default UEFIImage;
