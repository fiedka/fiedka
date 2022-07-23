import React, { useState } from "react";
import PropTypes from "prop-types";

export const EditContext = React.createContext({});

export const EditProvider = ({ children }) => {
  const [removals, setRemovals] = useState([]);

  // TODO: support undoing a single removal
  const removeFile = (b) => {
    setRemovals((r) => (r.find(({ guid }) => guid === b.guid) ? r : [...r, b]));
  };

  const clear = () => {
    setRemovals([]);
  };

  return (
    <EditContext.Provider
      value={{
        removeFile,
        clear,
        removals,
        setRemovals,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

EditProvider.propTypes = {
  children: PropTypes.element,
};
