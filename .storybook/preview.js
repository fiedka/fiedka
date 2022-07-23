import React from "react";
import { Provider } from "react-redux";
import "../src/_utils";
import { globalStyle, blockStyle } from "../src/global-style";
import store from "../src/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <div>
        <Story />
        <style jsx global>
          {globalStyle}
        </style>
        <style jsx global>
          {blockStyle}
        </style>
      </div>
    </Provider>
  ),
];
