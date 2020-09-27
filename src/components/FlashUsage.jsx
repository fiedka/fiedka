import React from "react";
import PropTypes from "prop-types";

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

const FlashUsage = ({ data }) => {
  const rows = data.map((d, i) => {
    const cols = d.split("").map((e, j) => <Cell key={j} e={e} />);
    return <tr key={i}>{cols}</tr>;
  });
  return (
    <>
      <div>red: `0xff`, green: `0x00`, blue: used</div>
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

FlashUsage.propTypes = {
  data: PropTypes.array,
};

export default FlashUsage;
