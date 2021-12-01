import React from "react";
import "../src/_utils";
import { globalStyle, blockStyle } from "../src/global-style";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <div>
      <Story />
      <style jsx global>
        {globalStyle}
      </style>
      <style jsx global>
        {blockStyle}
      </style>
    </div>
  ),
];
