import css from "styled-jsx/css";
import colors from "./util/colors";

export const globalStyle = css.global`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    background-color: #dedede;
    font-size: 12px;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export const blockStyle = css.global`
  .block {
    display: inline-block;
    width: 8px;
    height: 8px;
  }
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
`;
