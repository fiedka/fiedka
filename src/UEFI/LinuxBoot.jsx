import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@coalmines/indui";
import { useFilePicker } from "use-file-picker";
import Loader from "../components/Loader";

const LinuxBoot = ({ onSelectFile }) => {
  const { openFilePicker, filesContent, loading, errors, plainFiles } =
    useFilePicker({
      multiple: false,
      readAs: "ArrayBuffer",
      maxFileSize: 15, // megabytes
    });

  const fileName = plainFiles.length > 0 ? plainFiles[0].name : "";

  useEffect(() => {
    if (filesContent.length) {
      console.info(`[linuxboot] ${fileName}`);
      const f = filesContent[0].content;
      onSelectFile(new Uint8Array(f), f.byteLength);
    }
  }, [filesContent]);

  return (
    <Button onClick={openFilePicker}>
      {loading ? <Loader>Reassembling...</Loader> : "LinuxBoot 🐧"}
    </Button>
  );
};

LinuxBoot.propTypes = {
  onSelectFile: PropTypes.func,
};

export default LinuxBoot;
