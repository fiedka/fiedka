import React, { useState } from "react";
import PropTypes from "prop-types";

export const EditContext = React.createContext({});

export const EditProvider = ({ children }) => {
  const [removals, setRemovals] = useState([]);

  const removeFile = (b) => {
    setRemovals((r) => (r.find(({ guid }) => guid === b.guid) ? r : [...r, b]));
  };

  const clear = () => {
    setRemovals([]);
  };

  return (
    <EditContext.Provider value={{ removeFile, clear, removals }}>
      {children}
    </EditContext.Provider>
  );
};

EditProvider.propTypes = {
  children: PropTypes.element,
};
