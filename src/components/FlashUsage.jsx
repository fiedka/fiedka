import React from "react";
import PropTypes from "prop-types";

const Cell = ({ e }) => {
  return (
    <>
      <td className={e}></td>
      <style jsx>
        {`
          td {
            height: 8px;
          }
          .used {
            background-color: #ee0000;
          }
          .full {
            background-color: #00ee00;
          }
          .zero {
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

const FlashUsage = ({ usage }) => {
  const { layout, blocks, zero, full, used } = usage;
  const rows = layout.map(({ entries }, i) => {
    const cols = entries.map((e, j) => <Cell key={j} e={e} />);
    return <tr key={i}>{cols}</tr>;
  });
  return (
    <>
      <table>
        <tr>
          <th>blocks</th>
          <td>{blocks}</td>
        </tr>
        <tr>
          <th>
            zero (blue, <pre>0x00</pre>)
          </th>
          <td>{zero}</td>
        </tr>
        <tr>
          <th>
            full (green, <pre>0xff</pre>)
          </th>
          <td>{full}</td>
        </tr>
        <tr>
          <th>used (red)</th>
          <td>{used}</td>
        </tr>
      </table>
      <table>
        <tbody>{rows}</tbody>
      </table>
      <style jsx>{`
        table {
          width: 320px;
          padding: 0;
          font-family: sans-serif;
        }
        th {
          text-align: left;
        }
        td {
          padding-right: 32px;
        }
        pre {
          display: inline;
        }
      `}</style>
    </>
  );
};

FlashUsage.propTypes = {
  usage: PropTypes.object,
};

export default FlashUsage;
