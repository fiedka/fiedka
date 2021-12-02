import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, LoadingAnimation, Tabs, TextLine } from "@coalmines/indui";
import { useFilePicker } from "use-file-picker";
import wasm from "./main.go";
import UEFIImage from "./UEFIImage";
import AMDImage from "./AMDImage";
import CBFSImage from "./CBFSImage";
import colors from "./util/colors";

const { fmap, amdana, cbfsana } = wasm;

// use this instead of the real utka for testing only amdana
const utka = () => Promise.reject("Skipping UEFI analysis");
// const amdana = () => Promise.reject("Skipping AMD/PSP analysis");

const Main = ({ data, fileName }) => {
  const { amd, cbfs, fmap, intel, uefi } = data;
  const menu = [];
  if (cbfs) {
    menu.push({
      id: "cbfs",
      body: <CBFSImage data={cbfs} fmap={fmap} name={fileName} />,
      label: "CBFS",
    });
  }
  if (uefi) {
    menu.push({
      id: "uefi",
      body: <UEFIImage data={uefi} fmap={fmap} name={fileName} />,
      label: "UEFI",
    });
  }
  if (amd) {
    menu.push({
      id: "amd",
      body: <AMDImage data={amd} fmap={fmap} name={fileName} />,
      label: "AMD",
    });
  }
  // TODO: Add Intel ME support
  if (intel) {
    console.info("Intel inside");
  }
  if (!menu.length) {
    return <TextLine>No firmware detected</TextLine>;
  }
  return <Tabs menu={menu} />;
};

Main.propTypes = {
  data: PropTypes.exact({
    amd: PropTypes.object,
    cbfs: PropTypes.object,
    fmap: PropTypes.object,
    intel: PropTypes.object,
    uefi: PropTypes.object,
  }),
  fileName: PropTypes.string,
};

const Analyze = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [openFileSelector, { filesContent, loading, errors, plainFiles }] =
    useFilePicker({
      multiple: true,
      readAs: "ArrayBuffer",
      // accept: ['.bin', '.rom'],
      limitFilesConfig: { min: 1, max: 1 },
      // minFileSize: 1, // in megabytes
      maxFileSize: 65,
      // readFilesContent: false, // ignores file content
    });

  const analyze = async (indata, size) => {
    setData(null);
    setError(null);
    // TODO: fmap should never fail, what should we do if it does though?
    try {
      const res = await Promise.allSettled([
        fmap(indata, size),
        utka(indata, size),
        amdana(indata, size),
        cbfsana(indata, size),
      ]);
      setData({
        fmap: JSON.parse(res[0].value),
        uefi: res[1].status === "fulfilled" ? JSON.parse(res[1].value) : null,
        amd: res[2].status === "fulfilled" ? JSON.parse(res[2].value) : null,
        cbfs: res[3].status === "fulfilled" ? JSON.parse(res[3].value) : null,
      });
      res.forEach((r) => {
        if (r.status === "rejected" && r.reason) {
          console.error(r.reason);
          setError((errors || []).concat([r.reason]));
        }
      });
    } catch (e) {
      console.error(e);
      setError((errors || []).concat(e));
    }
  };

  useEffect(() => {
    if (filesContent.length) {
      const f = filesContent[0].content;
      analyze(new Uint8Array(f), f.byteLength);
    }
  }, [filesContent]);

  const fileName = plainFiles.length > 0 ? plainFiles[0].name : "";

  return (
    <div style={{ fontSize: 9 }}>
      <Button onClick={() => openFileSelector()}>
        {loading ? (
          <>
            <LoadingAnimation type="gigagampfa">⚙️⚙️</LoadingAnimation>
            Analyzing...{" "}
          </>
        ) : (
          "Select file"
        )}
      </Button>
      {error && (
        <p className="error">
          <h2>Errors</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </p>
      )}
      {data && <Main data={data} fileName={fileName} />}
      <style jsx>{`
        .error {
          max-width: 420px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

const App = () => (
  <div>
    <h1>Fiedka - analyze a firmware image</h1>
    <Analyze />
    <h2>TPM log demo</h2>
    <style jsx global>{`
      html {
        box-sizing: border-box;
        scroll-behavior: smooth;
      }
      body {
        margin: 0;
        background-color: #dedede;
        font-size: 12px;
      }
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }
      .block {
        display: inline-block;
        width: 8px;
        height: 8px;
      }
    `}</style>
    <style jsx global>{`
      .block-used {
        background-color: ${colors[25]};
      }
      .block-full {
        background-color: ${colors[14]};
      }
      .block-zero {
        background-color: ${colors[9]};
      }
      .block-marked {
        background-color: ${colors[6]};
      }
      .block-hovered-marked {
        background-color: ${colors[4]};
      }
      .block-hovered {
        background-color: ${colors[2]};
      }
    `}</style>
  </div>
);

export default App;
