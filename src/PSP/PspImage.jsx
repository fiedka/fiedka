import React, { createRef, useState } from "react";
import PropTypes from "prop-types";
import PspDir, { hexify } from "../PSP/PspDir";
import { Boop } from "@coalmines/indui";
import { PubKeyProvider } from "../context/PubKeyContext";

const jumpToTop = () => window.scrollTo(0, 2);

/**
 * Discard duplicate directories based on address
 *
 * PSP images may include two data structures for legacy and v2 headers. The
 * entries are the same otherwise, so this is redundant for display.
 */
const filterUniqueAddress = (dirs) =>
  dirs.reduce(
    (a, c) => (a.find((d) => d.address === c.address) ? a : [...a, c]),
    []
  );

const filterDir = (dir, filter) => {
  if (!filter) {
    return dir;
  }
  const f = filter.toLowerCase();
  // sectionType can be an array, so stringify first
  return {
    ...dir,
    entries: dir.entries.filter(
      (e) =>
        e.sectionType && JSON.stringify(e.sectionType).toLowerCase().match(f)
    ),
  };
};

const PspImage = ({ directories }) => {
  const [filter, setFilter] = useState("");
  const dirs = directories.map((v) => ({ ...v, ref: createRef(null) }));
  const jumpToDir = (address) => {
    const dir = dirs.find((d) => d.address === address);
    if (dir) {
      const pos = dir.ref.current.offsetTop;
      // leave some space for the sticky bar
      window.scrollTo(0, pos - 72);
    }
  };
  const onChange = (e) => setFilter(e.target.value);
  return (
    <PubKeyProvider>
      <div>
        <header>
          <span>
            Jump to Dir
            {filterUniqueAddress(dirs).map(({ address }, i) => (
              <Boop key={i} onClick={() => jumpToDir(address)}>
                0x{hexify(address)}
              </Boop>
            ))}
          </span>
          <input placeholder="filter" onChange={onChange} />
          <Boop onClick={jumpToTop}>^</Boop>
        </header>
        <section>
          {dirs.map((d) => (
            <PspDir key={d.directory} dir={filterDir(d, filter)} ref={d.ref} />
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
          z-index: 20;
        }
        input {
          height: 32px;
        }
      `}</style>
    </PubKeyProvider>
  );
};

PspImage.propTypes = {
  directories: PropTypes.array,
};

export default PspImage;
