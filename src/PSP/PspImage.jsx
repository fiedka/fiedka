import React, { createRef, useState } from "react";
import PropTypes from "prop-types";
import PspDir, { hexify } from "../PSP/PspDir";
import { Boop, Button, Input, TextLine } from "@coalmines/indui";
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
  const [active, setActive] = useState(null);
  const dirs = directories.map((v) => ({ ...v, ref: createRef(null) }));
  const jumpToDir = (address) => {
    const dir = dirs.find((d) => d.address === address);
    if (dir) {
      const pos = dir.ref.current.offsetTop;
      // leave some space for the sticky bar
      window.scrollTo(0, pos - 72);
      setActive(address);
    }
  };
  // NOTE: directories appear multiple times for different PSP versions.
  // TODO: Should we provide different views for each PSP version?
  return (
    <PubKeyProvider>
      <div>
        <header>
          <span className="header-entry">
            <TextLine label="jump">to dir</TextLine>
          </span>
          {filterUniqueAddress(dirs).map(({ address }) => (
            <span key={address} className="header-entry">
              <Button
                active={address === active}
                small
                onClick={() => jumpToDir(address)}
              >
                0x{hexify(address)}
              </Button>
            </span>
          ))}
          <span className="header-entry">
            <Input
              label="filter entries"
              type="search"
              placeholder="enter substring"
              onEdit={setFilter}
            />
          </span>
          <span className="header-entry">
            <Boop small onClick={jumpToTop}>
              👆
            </Boop>
          </span>
        </header>
        <section>
          {dirs.map((d, i) => (
            <PspDir
              key={`${d.address}_${i}`}
              dir={filterDir(d, filter)}
              ref={d.ref}
            />
          ))}
        </section>
      </div>
      <style jsx>{`
        header {
          background: #fcfcfc;
          position: sticky;
          top: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          z-index: 20;
          padding: 2px;
        }
        .header-entry:nth-of-type(1) {
          flex: 1 1 auto;
          flex-direction: column;
        }
        .header-entry:nth-last-of-type(2) {
          flex: 1 1 auto;
          flex-direction: column;
        }
        .header-entry {
          display: flex;
          margin: 10px 4px 0;
        }
      `}</style>
    </PubKeyProvider>
  );
};

PspImage.propTypes = {
  directories: PropTypes.array,
};

export default PspImage;
