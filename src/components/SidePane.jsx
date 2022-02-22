import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Boop } from "@coalmines/indui";

const SidePane = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);
  return (
    <div className={cn("side-pane", { collapsed })}>
      <div className={cn("content", { hidden: collapsed })}>{children}</div>
      <div className="hider">
        <Boop onClick={toggle} small>
          {collapsed ? "👈" : "👉"}
        </Boop>
      </div>
      <style jsx>{`
        .side-pane {
          height: 100%;
          width: 460px;
          transition: width 0.3s ease-in-out;
          overflow: hidden;
          padding: 0 4px;
        }
        .collapsed {
          width: 60px;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          height: 100%;
        }
        .content > :global(*) {
          width: 100%;
        }
        .content > :global(*:nth-child(odd)) {
          flex: 1 1 0;
          min-height: 0;
        }
        .content > :global(*:nth-child(even)) {
          flex-grow: 0;
          flex-shrink: 0;
        }
        .hidden {
          display: none;
        }
        .hider {
          position: absolute;
          top: 3px;
          right: 3px;
        }
      `}</style>
    </div>
  );
};

SidePane.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SidePane;
