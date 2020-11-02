import React, { createRef } from "react";
import PropTypes from "prop-types";
import { Boop } from "@coalmines/indui";
import FV from "./FV";

const jumpToTop = () => window.scrollTo(0, 2);

const FirmwareVolumes = ({ fvs }) => {
  const vols = fvs.map((v) => ({ ...v, ref: createRef(null) }));
  const jumpToFV = (guid) => {
    const vol = vols.find((v) => v.guid === guid);
    if (vol) {
      const pos = vol.ref.current.offsetTop;
      // leave some space for the sticky bar
      window.scrollTo(0, pos - 32);
    }
  };
  return (
    <>
      <header>
        <span>
          Jump to FV
          {vols.map(({ guid }, i) => (
            <Boop key={i} onClick={() => jumpToFV(guid)}>
              {guid.substr(0, 4).toUpperCase()}
            </Boop>
          ))}
        </span>
        <Boop onClick={jumpToTop}>^</Boop>
      </header>
      <section>
        {vols.map(({ guid, parentGuid, size, files, ref }, i) => (
          <FV
            key={i}
            guid={guid}
            parentGuid={parentGuid}
            size={size}
            ffs={files}
            ref={ref}
            onJumpToFV={jumpToFV}
          />
        ))}
      </section>
      <style jsx>{`
        header {
          background: #f0f0f0;
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

FirmwareVolumes.propTypes = {
  fvs: PropTypes.array,
};

export default FirmwareVolumes;
