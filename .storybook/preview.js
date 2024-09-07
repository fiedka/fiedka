// import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import "../src/_utils";
import { globalStyle, blockStyle } from "../src/global-style";
import store from "../src/store";

const preview = { // : Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <div>
        <Story />
        {/*
        <style jsx global>
          {globalStyle}
        </style>
        <style jsx global>
          {blockStyle}
        </style>
        */}
      </div>
    </Provider>
  ),
];
