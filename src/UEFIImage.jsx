import React from "react";
import PropTypes from "prop-types";
import { transform as utkTransform } from "./util/utk";
import { MarkedEntriesProvider } from "./context/MarkedEntriesContext";
import { GUIDProvider } from "./context/GUIDContext";
import Layout from "./components/Layout";
import FlashUsage from "./components/FlashUsage";
import FirmwareVolumes from "./UEFI/FirmwareVolumes";

const getUEFIElements = (data) => {
  if (data.Regions) {
    const region = data.Regions.find((r) => r.Type === "*uefi.BIOSRegion");
    if (region && region.Value) {
      return region.Value.Elements;
    }
  }
  if (data.Elements) {
    return data.Elements;
  }
  return null;
};

const getFVs = (data) => {
  const elements = getUEFIElements(data);
  if (elements) {
    const fvs = elements.filter((e) => e.Type === "*uefi.FirmwareVolume");
    return utkTransform(fvs);
  }
  return [];
};

const UEFIImage = ({ data, fmap, name }) => {
  const fvs = getFVs(data);

  return (
    <MarkedEntriesProvider>
      <Layout sidepane={<FlashUsage usage={fmap} />}>
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
