import React, { createRef, useState } from "react";
import PropTypes from "prop-types";
import { Boop, Button, Input, TextLine } from "@coalmines/indui";
import FV from "./FV";

const jumpToTop = () => window.scrollTo(0, 2);

const matches = (filters, val) =>
  val && filters.some((f) => val.toLowerCase().match(f));

const filterFfs = (files, filter) => {
  if (!filter) {
    return files;
  }
  const filters = filter.toLowerCase().split(" ");
  return files.filter(
    ({ name, guid }) => matches(filters, name) || matches(filters, guid)
  );
};

const FirmwareVolumes = ({ fvs, name }) => {
  const [filter, setFilter] = useState("");
  const [active, setActive] = useState(null);
  const vols = fvs.map((v) => ({ ...v, ref: createRef(null) }));
  const jumpToFV = (guid) => {
    const vol = vols.find((v) => v.guid === guid);
    if (vol) {
      const pos = vol.ref.current.offsetTop;
      // leave some space for the sticky bar
      window.scrollTo(0, pos - 32);
      setActive(guid);
    }
  };
  return (
    <div>
      <header className="uefi">
        <span className="header-entry">
          <TextLine label="UEFI">
            <h2>{name || "unknown rev"}</h2>
          </TextLine>
        </span>
        {vols.map(({ guid }, i) => (
          <span key={i} className="header-entry">
            <Button
              active={guid === active}
              small
              onClick={() => jumpToFV(guid)}
            >
              {guid.substr(0, 4).toUpperCase()}
            </Button>
          </span>
        ))}
        <span className="header-entry">
          <Input
            label="filter entries"
            type="search"
            placeholder="GUID or name substring"
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
        {vols.map(({ guid, parentGuid, size, files, ref }, i) => (
          <FV
            key={i}
            guid={guid}
            parentGuid={parentGuid}
            size={size}
            ffs={filterFfs(files, filter)}
            ref={ref}
            onJumpToFV={jumpToFV}
          />
        ))}
      </section>
      <style jsx>{`
        header.uefi {
          background: #fcfcfc;
          position: sticky;
          top: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          z-index: 200;
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
    </div>
  );
};

FirmwareVolumes.propTypes = {
  fvs: PropTypes.array,
  name: PropTypes.string,
};

export default FirmwareVolumes;
