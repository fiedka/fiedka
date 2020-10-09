import React from "react";
import PropTypes from "prop-types";

const FlashUsage = ({ usage }) => {
  const { layout, blocks, zero, full, used } = usage;
  const rows = layout.map(({ entries }, i) => {
    const cols = entries.map((e, j) => <td key={j} className={e}></td>);
    return <tr key={i}>{cols}</tr>;
  });
  return (
    <>
      <table className="legend">
        <tr>
          <th>blocks</th>
          <td>{blocks}</td>
        </tr>
        <tr>
          <th>
            <div className="zero square"></div> zero (<pre>0x00</pre>)
          </th>
          <td>{zero}</td>
        </tr>
        <tr>
          <th>
            <div className="full square"></div> full (<pre>0xff</pre>)
          </th>
          <td>{full}</td>
        </tr>
        <tr>
          <th>
            <div className="used square"></div> used
          </th>
          <td>{used}</td>
        </tr>
      </table>
      <table>
        <tbody>{rows}</tbody>
      </table>
      <style jsx>
        {`
          table {
            width: 320px;
            padding: 0;
            font-family: sans-serif;
          }
          th {
            text-align: left;
          }
          .legend td {
            padding-right: 32px;
          }
          pre {
            display: inline;
          }
          .square {
            display: inline-block;
            width: 8px;
            height: 8px;
          }
        `}
      </style>
      <style jsx global>
        {`
          td {
            height: 8px;
          }
          .used {
            background-color: #ee0000;
          }
          .full {
            background-color: #00aa90;
          }
          .zero {
            background-color: #0000ee;
          }
        `}
      </style>
    </>
  );
};

FlashUsage.propTypes = {
  usage: PropTypes.object,
};

export default FlashUsage;
