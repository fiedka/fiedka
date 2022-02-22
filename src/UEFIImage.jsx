import React from "react";
import PropTypes from "prop-types";
import { Divider } from "@coalmines/indui";
import { getFVs } from "./util/utk";
import { MarkedEntriesProvider } from "./context/MarkedEntriesContext";
import { GUIDProvider } from "./context/GUIDContext";
import { EditProvider } from "./UEFI/EditContext";
import Layout from "./components/Layout";
import SidePane from "./components/SidePane";
import FlashUsage from "./components/FlashUsage";
import EditPane from "./UEFI/EditPane";
import FirmwareVolumes from "./UEFI/FirmwareVolumes";

const UEFIImage = ({ data, fmap, name }) => {
  const fvs = getFVs(data);

  return (
    <MarkedEntriesProvider>
      <EditProvider>
        <Layout
          sidepane={
            <SidePane>
              <FlashUsage usage={fmap} />
              <Divider />
              <EditPane />
            </SidePane>
          }
        >
          <GUIDProvider>
            <FirmwareVolumes fvs={fvs} name={name} />
          </GUIDProvider>
        </Layout>
      </EditProvider>
    </MarkedEntriesProvider>
  );
};

UEFIImage.propTypes = {
  data: PropTypes.object,
  fmap: PropTypes.object,
  name: PropTypes.string,
};

export default UEFIImage;
