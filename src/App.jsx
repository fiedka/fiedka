import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import wasm from "./main.go";
import UEFIImage from "./UEFIImage";
import colors from "./util/colors";
import tpmLog from "./TPM/data.json";
import tpmLog2 from "./TPM/tpmlog2.json";
import eventlog from "./TPM/eventlog.json";
import TPMLog, { transform } from "./TPM/Log.jsx";

const tpmLog12 = {
  events: eventlog.PcrList.map(({ digest, type, data: event }, id) => ({
    id,
    type,
    event,
    digests: [{ algorithm: "sha1", digest }],
  })),
};

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
    setError(null);
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
      setError((errors || []).concat(e));
    }
  };

  useEffect(() => {
    if (filesContent.length) {
      const f = filesContent[0].content;
      analyze(new Uint8Array(f), f.byteLength);
    }
  }, [filesContent]);

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
    <h2>TPM log demo</h2>
    <div className="flex">
      <div>
        <h3>TPM 1.2 sample (tpm2_eventlog)</h3>
        <TPMLog events={transform(tpmLog2.events)} />
      </div>
      <div>
        <h3>TPM 1.2 sample (tpmtool)</h3>
        <TPMLog events={tpmLog12.events} />
      </div>
    </div>
    <div className="flex">
      <div>
        <h3>TPM 2.0 sample (tpm2_eventlog)</h3>
        <TPMLog events={transform(tpmLog)} />
      </div>
    </div>
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
