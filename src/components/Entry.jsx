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
    <>
      <div
        className={cn("card", { active, open })}
        onClick={onSelect}
        onMouseOver={onHover}
        onMouseLeave={onOut}
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          border: 1px solid #422384;
          margin: 10px 1% 0;
          padding: 4px;
          min-width: 350px;
          width: 48%;
        }
        .card.open {
          margin: 10px 1%;
        }
        .card:hover {
          background-color: ${colors[2]};
        }
        .card.active:hover {
          background-color: ${colors[4]};
        }
        .active {
          background-color: ${colors[6]};
        }
        header {
          font-weight: bold;
          text-align: center;
          background-color: ${colors[0]};
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
          display: flex;
          flex: 1;
          justify-content: space-between;
          font-family: sans-serif;
          background-color: #eee;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

Entry.propTypes = {
  open: PropTypes.boolean,
  entry: PropTypes.object,
  header: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
};

export default Entry;
