import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children, sidepane }) => (
  <div className="layout">
    {children}
    {sidepane && <aside>{sidepane}</aside>}
    <style jsx>{`
      .layout {
        display: flex;
      }
      .layout > :global(*:nth-child(1)) {
        flex: 1 1 0;
      }
      aside {
        position: sticky;
        top: 0;
        min-height: 0;
        height: 100vh;
      }
    `}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  sidepane: PropTypes.element,
};

export default Layout;
