import React from "react";
import PropTypes from "prop-types";

import colors from "../util/colors";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        html {
          box-sizing: border-box;
          scroll-behavior: smooth;
        }
        body {
          background-color: #dedede;
          font-size: 12px;
        }
        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }
        .block {
          display: inline-block;
          width: 8px;
          height: 8px;
        }
      `}</style>
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
    </>
  );
}

App.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
};
