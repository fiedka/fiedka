import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { uefiActions } from "./store";

export const EditContext = React.createContext({});

export const EditProvider = ({ children }) => {
  const [removals, setRemovals] = useState([]);
  const dispatch = useDispatch();

  const annotate = (a) => {
    dispatch(uefiActions.annotate(a));
  };

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
        // annotations,
        annotate,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

EditProvider.propTypes = {
  children: PropTypes.element,
};
