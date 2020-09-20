import React from "react";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        html {
          box-sizing: border-box;
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
      `}</style>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
};
