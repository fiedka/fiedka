import React, { useState } from "react";
import PropTypes from "prop-types";

export const PubKeyContext = React.createContext([null, () => {}]);

export const PubKeyProvider = ({ children }) => {
  const [pubKey, setPubKey] = useState(null);

  return (
    <PubKeyContext.Provider value={[pubKey, setPubKey]}>
      {children}
    </PubKeyContext.Provider>
  );
};

PubKeyProvider.propTypes = {
  children: PropTypes.object,
};
