import React from "react";
import PropTypes from "prop-types";
import { LoadingAnimation } from "@coalmines/indui";

const Loader = ({ children }) => (
  <>
    {children}
    <LoadingAnimation type="gigagampfa">⚙️⚙️</LoadingAnimation>
  </>
);

Loader.propTypes = {
  children: PropTypes.node,
};

export default Loader;
