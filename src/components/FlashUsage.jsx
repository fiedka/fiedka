import React from "react";
import PropTypes from "prop-types";

const FlashUsage = ({ usage }) => {
  const { layout, blocks, zero, full, used } = usage;
  const rows = layout.map(({ entries }, i) => {
    const cols = entries.map((e, j) => <td key={j} className={e}></td>);
    return <tr key={i}>{cols}</tr>;
  });

  const percentage = (x) => Math.round((x / blocks) * 10000) / 100;
  const size = (x) => Math.round((x / 256) * 100) / 100;

  return (
    <>
      <table className="legend">
        <tr>
          <th>blocks</th>
          <td>{blocks}</td>
          <td>100%</td>
          <td>{size(blocks)}M</td>
        </tr>
        <tr>
          <th>
            <div className="zero square"></div> zero (<pre>0x00</pre>)
          </th>
          <td>{zero}</td>
          <td>{percentage(zero)}%</td>
          <td>{size(zero)}M</td>
        </tr>
        <tr>
          <th>
            <div className="full square"></div> full (<pre>0xff</pre>)
          </th>
          <td>{full}</td>
          <td>{percentage(full)}%</td>
          <td>{size(full)}M</td>
        </tr>
        <tr>
          <th>
            <div className="used square"></div> used
          </th>
          <td>{used}</td>
          <td>{percentage(used)}%</td>
          <td>{size(used)}M</td>
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
