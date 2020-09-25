import React from "react";
import PropTypes from "prop-types";

import fixture from "../fixtures/A3MSTX_3.60.json";
import usage from "../fixtures/A3MSTX_3.60.fmap_usage.json";
import { GUIDProvider } from "../context/GUIDContext";
import Volumes from "../components/Volumes";

const usageData = Object.values(usage.data);

const getClassName = (e) => {
  switch (e) {
    case "#":
      return "b";
    case "0":
      return "g";
    case ".":
    default:
      return "r";
  }
};

const Cell = ({ e }) => {
  const className = getClassName(e);
  return (
    <>
      <td className={className}></td>
      <style jsx>
        {`
          td {
            height: 8px;
          }
          .r {
            background-color: #ee0000;
          }
          .g {
            background-color: #00ee00;
          }
          .b {
            background-color: #0000ee;
          }
        `}
      </style>
    </>
  );
};
Cell.propTypes = {
  e: PropTypes.string,
};

const renderUsageData = (data) => {
  const rows = data.map((d, i) => {
    const cols = d.split("").map((e, j) => <Cell key={j} e={e} />);
    return <tr key={i}>{cols}</tr>;
  });
  return (
    <>
      <table>
        <tbody>{rows}</tbody>
      </table>
      <style jsx>{`
        table {
          width: 320px;
          padding: 0;
        }
      `}</style>
    </>
  );
};

const Page = () => {
  const volumes = fixture.Elements.filter(
    (e) => e.Type === "*uefi.FirmwareVolume"
  );
  const usageTable = renderUsageData(usageData);

  return (
    <>
      <div className="layout">
        <div>
          <GUIDProvider>
            <Volumes volumes={volumes} />
          </GUIDProvider>
        </div>
        <aside>
          <h2>Flash Usage</h2>
          {usageTable}
        </aside>
      </div>
      <style jsx>{`
        .layout {
          display: flex;
        }
        aside {
          float: left;
        }
      `}</style>
    </>
  );
};

export default Page;
