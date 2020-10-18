import React, { useState } from "react";
import PropTypes from "prop-types";

export const MarkedEntriesContext = React.createContext({});

export const MarkedEntriesProvider = ({ children }) => {
  const [hoveredEntry, setHoveredEntry] = useState(null);
  const [markedEntries, setMarkedEntries] = useState([]);

  const addEntry = (e) => {
    setMarkedEntries([...markedEntries, e]);
  };
  const removeEntry = (e) => {
    // the address identifies an entry uniquely
    const entries = markedEntries.filter(
      (entry) => entry.address !== e.address
    );
    setMarkedEntries(entries);
  };

  return (
    <MarkedEntriesContext.Provider
      value={{
        hoveredEntry,
        setHoveredEntry,
        markedEntries,
        addEntry,
        removeEntry,
      }}
    >
      {children}
    </MarkedEntriesContext.Provider>
  );
};

MarkedEntriesProvider.propTypes = {
  children: PropTypes.object,
};
