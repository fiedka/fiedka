import React from "react";
import PropTypes from "prop-types";
import PspDir from "../PSP/PspDir";
import { PubKeyProvider } from "../context/PubKeyContext";

const PspImage = ({ directories }) => (
  <PubKeyProvider>
    <div>
      {directories.map((d) => (
        <PspDir key={d.directory} dir={d} />
      ))}
    </div>
  </PubKeyProvider>
);

PspImage.propTypes = {
  directories: PropTypes.array,
};

export default PspImage;
