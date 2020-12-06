import React, { createRef } from "react";
import PropTypes from "prop-types";
import PspDir, { hexify } from "../PSP/PspDir";
import { Boop } from "@coalmines/indui";
import { PubKeyProvider } from "../context/PubKeyContext";

const jumpToTop = () => window.scrollTo(0, 2);

const PspImage = ({ directories }) => {
  const dirs = directories.map((v) => ({ ...v, ref: createRef(null) }));
  const jumpToDir = (address) => {
    const dir = dirs.find((d) => d.address === address);
    if (dir) {
      const pos = dir.ref.current.offsetTop;
      // leave some space for the sticky bar
      window.scrollTo(0, pos - 72);
    }
  };
  return (
    <PubKeyProvider>
      <div>
        <header>
          <span>
            Jump to Dir
            {dirs.map(({ address }, i) => (
              <Boop key={i} onClick={() => jumpToDir(address)}>
                0x{hexify(address)}
              </Boop>
            ))}
          </span>
          <Boop onClick={jumpToTop}>^</Boop>
        </header>
        <section>
          {dirs.map((d) => (
            <PspDir key={d.directory} dir={d} ref={d.ref} />
          ))}
        </section>
      </div>
      <style jsx>{`
        header {
          background: #f0f0f0;
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </PubKeyProvider>
  );
};

PspImage.propTypes = {
  directories: PropTypes.array,
};

export default PspImage;
