import React from "react";
import "../src/_utils";
import colors from "../src/util/colors";
import Style from "../src/Style";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <div>
      <Story />
      <style jsx global>{`
        .block-used {
          background-color: ${colors[25]};
        }
        .block-full {
          background-color: ${colors[14]};
        }
        .block-zero {
          background-color: ${colors[9]};
        }
        .block-marked {
          background-color: ${colors[6]};
        }
        .block-hovered-marked {
          background-color: ${colors[4]};
        }
        .block-hovered {
          background-color: ${colors[2]};
        }
      `}</style>
    </div>
  ),
];
