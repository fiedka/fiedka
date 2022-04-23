import React from "react";

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
    PCRIndex: l.PCRIndex,
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
          margin-left: 40px;
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
    <div className="flex">
      <h3>Event</h3>
      <TpmEvent event={data.event} />
    </div>
    <div className="flex">
      <h3>Digests</h3>
      <Digests digests={data.digests} />
    </div>
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

const TPMLog = ({ events = [] }) => {
  return (
    <>
      <h4>#entries: {events.length}</h4>
      <ul className="log">
        {events.map((e) => (
          <li key={e.id}>
            <Entry data={e} />
          </li>
        ))}
        <style jsx>{`
          ul {
            list-style: none;
            font-size: 10px;
            font-family: sans-serif;
            word-wrap: wrap;
          }
          ul.log {
            overflow-y: scroll;
            width: 580px;
            max-height: 600px;
          }
          li {
            border: 1px solid blue;
            padding: 8px;
          }
        `}</style>
      </ul>
    </>
  );
};

export default TPMLog;
