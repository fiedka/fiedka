import React from "react";
import PropTypes from "prop-types";
import { Divider } from "@coalmines/indui";

const eventTypes = {
  EV_S_CRTM_VERSION: "CRTM version",
  EV_EFI_PLATFORM_FIRMWARE_BLOB: "EFI platform firmware blob",
  EV_EFI_BOOT_SERVICES_DRIVER: "EFI boot services driver",
  EV_EFI_BOOT_SERVICES_APPLICATION: "EFI boot services app",
  EV_EVENT_TAG: "event tag",
  EV_ACTION: "action",
  EV_SEPARATOR: "separator",
  EV_IPL: "IPL",
  EV_IPL_PARTITION_DATA: "IPL partition data",
};

const Type = ({ type }) => {
  return eventTypes[type] || type;
};

const transformDigests = (digests = []) =>
  digests.map((d) => ({
    algorithm: d.AlgorithmId,
    digest: d.Digest,
  }));

export const transform = (events = []) =>
  events.map((l) => ({
    id: l.EventNum,
    pcr: l.PCRIndex,
    type: l.EventType,
    event: l.Event,
    digests: transformDigests(l.Digests),
  }));

const TpmEvent = ({ event }) => {
  return (
    <span className="event mono">
      {event}
      <style jsx>{`
        .mono {
          font-family: monospace;
        }
        .event {
          display: inline;
          max-width: 75%;
          margin-left: 4px;
          overflow-wrap: break-word;
        }
      `}</style>
    </span>
  );
};

const Digests = ({ digests = [] }) => {
  return (
    <ul>
      {digests.map(({ algorithm, digest }) => (
        <li key={algorithm}>
          {algorithm}: <span className="mono">{digest || "--"}</span>
        </li>
      ))}
      <style jsx>{`
        .mono {
          font-family: monospace;
        }
      `}</style>
    </ul>
  );
};

const Entry = ({ data }) => (
  <div className="entry">
    <h2>
      <Type type={data.type} />
    </h2>
    <TpmEvent event={data.event} />
    {/*
    <div className="flex">
      <h3>Digests</h3>
      <Digests digests={data.digests} />
    </div>
    */}
    <style jsx>{`
      ul h2 {
        background-color: blue;
        color: white;
        margin: -6px -6px 4px;
        padding: 2px;
      }
      .entry h3 {
        font-size: 14px;
        margin: 2px 6px;
      }
      .flex {
        display: flex;
        align-items: center;
      }
    `}</style>
  </div>
);

const groupEntries = (events) => {
  const groups = events.reduce((a, c) => {
    if ([2, 3, 6].includes(c.pcr)) return a;
    a[c.pcr] = a[c.pcr] ? [...a[c.pcr], c] : [c];
    return a;
  }, {});
  // TODO: filter empty groups (with only a separator)
  return groups;
};

const Log = ({ pcr, group }) => (
  <section>
    <header>PCR #{pcr}</header>
    <ul className="log">
      {group.map((e) => (
        <li key={e.id}>
          {e.type === "EV_SEPARATOR" ? <Divider /> : <Entry data={e} />}
        </li>
      ))}
    </ul>
    <style jsx>{`
      ul {
        padding: 0;
        list-style: none;
        font-size: 10px;
        font-family: sans-serif;
        word-wrap: wrap;
      }
      ul.log {
        overflow-y: auto;
        min-width: 350px;
        max-height: 600px;
      }
      li {
        border: 1px solid blue;
        padding: 8px;
      }
      section {
        margin: 8px;
      }
      header {
        font-weight: bold;
      }
    `}</style>
  </section>
);

Log.propTypes = {
  group: PropTypes.array,
  pcr: PropTypes.number,
};

const TPMLog = ({ events = [] }) => {
  return (
    <span>
      <h4>#entries: {events.length}</h4>
      <div className="flex">
        {Object.entries(groupEntries(events))
          .filter(([pcr]) => pcr < 8)
          .map(([pcr, group]) => (
            <Log pcr={pcr} group={group} key={pcr} />
          ))}
      </div>
      <div className="flex">
        {Object.entries(groupEntries(events))
          .filter(([pcr]) => pcr >= 8)
          .map(([pcr, group]) => (
            <Log pcr={pcr} group={group} key={pcr} />
          ))}
      </div>
      <style jsx>{`
        .flex {
          display: flex;
        }
      `}</style>
    </span>
  );
};

TPMLog.propTypes = {
  events: PropTypes.array,
};

export default TPMLog;
