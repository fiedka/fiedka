import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ children, tip }) => {
  return (
    <>
      <span className="tooltip">
        <span className="tip">{tip}</span>
        {children}
      </span>
      <style>
        {`
          .tooltip {
            position: relative;
          }
          .tip {
            position: absolute;
            bottom: 16px;
            visibility: hidden;
            background-color: #fff;
            border: 1px solid #444;
            padding: 3px;
            z-index: 1;
          }
          .tooltip:hover .tip {
            visibility: visible;
          }
      `}
      </style>
    </>
  );
};

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tip: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Tooltip;
