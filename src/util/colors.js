import React from "react";

// see https://personal.sron.nl/~pault/#fig:scheme_rainbow_discrete_all
// and https://personal.sron.nl/~pault/data/tol_colors.py

const discreteRainbowPalette = [
  "#E8ECFB",
  "#D9CCE3",
  "#D1BBD7",
  "#CAACCB",
  "#BA8DB4",
  "#AE76A3",
  "#AA6F9E",
  "#994F88",
  "#882E72",
  "#1965B0",
  "#437DBF",
  "#5289C7",
  "#6195CF",
  "#7BAFDE",
  "#4EB265",
  "#90C987",
  "#CAE0AB",
  "#F7F056",
  "#F7CB45",
  "#F6C141",
  "#F4A736",
  "#F1932D",
  "#EE8026",
  "#E8601C",
  "#E65518",
  "#DC050C",
  "#A5170E",
  "#72190E",
  "#42150A",
];

export default discreteRainbowPalette;

export const Palette = () => (
  <div className="flex">
    {discreteRainbowPalette.map((c, i) => (
      <div key={c} style={{ backgroundColor: c }} className="color">
        {i}
      </div>
    ))}
    <style jsx>
      {`
        .flex {
          display: flex;
          flex-wrap: wrap;
        }
        .color {
          font-family: sans-serif;
          font-size: 10px;
          margin: 8px 1px;
          padding-top: 12px;
          width: 16px;
          height: 6px;
        }
      `}
    </style>
  </div>
);
