import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import wasm from "./main.go";
import UEFIImage from "./UEFIImage";
import colors from "./util/colors";

const { fmap, utka } = wasm;

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
    try {
      const [utkParsed, flashMap] = await Promise.all([
        utka(indata, size),
        fmap(indata, size),
      ]);
      setData({
        utk: JSON.parse(utkParsed),
        fmap: JSON.parse(flashMap),
      });
    } catch (e) {
      console.error(e);
      setError(error.concat(e.message));
    }
  };

  useEffect(() => {
    if (filesContent.length) {
      const f = filesContent[0].content;
      analyze(new Uint8Array(f), f.byteLength);
    }
  }, [filesContent]);

  if (errors.length) {
    return (
      <div>
        <h2>Something went wrong, retry?</h2>
        <button onClick={() => openFileSelector()}>Pick a file</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h2>Analyzing...</h2>
      </div>
    );
  }

  const fileName = plainFiles.length > 0 ? plainFiles[0].name : "";

  return (
    <div style={{ fontSize: 9 }}>
      <button onClick={() => openFileSelector()}>Select file</button>
      {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
      {data && <UEFIImage data={data.utk} fmap={data.fmap} name={fileName} />}
    </div>
  );
};

const App = () => (
  <div>
    <h1>utk-web - analyze a firmware image</h1>
    <Analyze />
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
