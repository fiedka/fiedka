import React, { useState } from "react";
import PropTypes from "prop-types";

export const GUIDContext = React.createContext([null, () => {}]);

export const GUIDProvider = ({ children }) => {
  const [guid, setGuid] = useState(null);

  return (
    <GUIDContext.Provider value={[guid, setGuid]}>
      {children}
    </GUIDContext.Provider>
  );
};

GUIDProvider.propTypes = {
  children: PropTypes.array,
};
