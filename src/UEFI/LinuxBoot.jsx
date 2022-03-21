import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@coalmines/indui";
import { useFilePicker } from "use-file-picker";
import Loader from "../components/Loader";

const LinuxBoot = ({ onSelectFile }) => {
  const [openFileSelector, { filesContent, loading, errors, plainFiles }] =
    useFilePicker({
      multiple: true,
      readAs: "ArrayBuffer",
      limitFilesConfig: { min: 1, max: 1 },
      maxFileSize: 15,
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
    <Button onClick={() => openFileSelector()}>
      {loading ? <Loader>Reassembling...</Loader> : "LinuxBoot"}
    </Button>
  );
};

LinuxBoot.propTypes = {
  onSelectFile: PropTypes.func,
};

export default LinuxBoot;
