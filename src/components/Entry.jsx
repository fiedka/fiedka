import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { MarkedEntriesContext } from "../context/MarkedEntriesContext";
import colors from "../util/colors";

const Entry = ({ open = true, entry, header, children }) => {
  const [active, setActive] = useState(false);
  const markedEntriesContext = useContext(MarkedEntriesContext);

  const onSelect = () => {
    if (!active) {
      markedEntriesContext.addEntry(entry);
    } else {
      markedEntriesContext.removeEntry(entry);
    }
    setActive(!active);
  };
  const onHover = () => {
    markedEntriesContext.setHoveredEntry(entry);
  };
  const onOut = () => {
    markedEntriesContext.setHoveredEntry(null);
  };

  return (
    <div
      className={cn("entrycard", { active, open })}
      onMouseOver={onHover}
      onMouseLeave={onOut}
    >
      <header onClick={onSelect}>{header}</header>
      <main>{children}</main>
      <style jsx>{`
        .entrycard {
          display: flex;
          flex-direction: column;
          border: 1px solid ${colors[8]};
          margin: 10px 1% 0;
          padding: 4px;
          min-width: 350px;
          flex: 1;
        }
        .entrycard.open {
          margin: 10px 1%;
        }
        .entrycard:hover {
          background-color: ${colors[2]};
        }
        .entrycard.active:hover {
          background-color: ${colors[4]};
        }
        .active {
          background-color: ${colors[6]};
        }
        header {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          background-color: ${colors[0]};
          cursor: pointer;
        }
        .open main {
          max-height: 400px;
          padding: 3px;
        }
        main {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.2s ease-in, padding 0.2s ease;
          padding: 0;
          font-family: sans-serif;
          background-color: #eee;
        }
      `}</style>
    </div>
  );
};

Entry.propTypes = {
  open: PropTypes.bool,
  entry: PropTypes.object,
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Entry;
