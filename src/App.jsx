import React, { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import wasm from './main.go';
import UEFIImage from './UEFIImage';

const { add, fmap, utka, raiseError, someValue } = wasm;

const entryToEmoji = (e) => {
  switch (e) {
    case "zero": return "😶";
    case "full": return "🆓";
    case "used":
    default:
      return "📦";
  }
};

const LayoutBlocks = ({ layout }) => (
  <table>
    <tbody>
      {layout.map(({ address, entries }) => (
        <tr key={address}>
          <td>{address}</td>
          {entries.map((e, i) => (
            <td key={i}>{entryToEmoji(e)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const Fmap = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [utkRes, setUtkRes] = useState(null);
  const [
      openFileSelector,
			{ filesContent, loading, errors, plainFiles, clear }
  ] = useFilePicker({
      multiple: true,
      readAs: "ArrayBuffer",
      // accept: ['.bin', '.rom'],
      limitFilesConfig: { min: 1, max: 1 },
      // minFileSize: 1, // in megabytes
      maxFileSize: 65,
      // readFilesContent: false, // ignores file content
  });

  const utkAnalyze = async(indata, size) => {
    try {
      const parsed = await utka(indata, size);
      setUtkRes(JSON.parse(parsed));
    } catch (e) {
      console.error(e);
      setError(error.concat(e.message));
    }
  }

  const getFmap = async(indata, size) => {
    const encoded = await fmap(indata, size);
    try {
      const flashMap = JSON.parse(encoded);
      // console.info({ flashMap });
      setData(flashMap);
    } catch (e) {
      console.error(e);
      setError(error.concat(e.message));
    }
  }

	useEffect(() => {
    if (filesContent.length) {
      utkAnalyze(
        new Uint8Array(filesContent[0].content),
        filesContent[0].content.byteLength
      );
    }
  }, [filesContent]);

  if (errors.length) {
    return (
      <div>
        <button onClick={() => openFileSelector()}>Something went wrong, retry! </button>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontSize: 9 }}>
      {plainFiles && plainFiles.length > 0 &&
        <h2>{plainFiles[0].name}</h2>
      }
      <button onClick={() => openFileSelector()}>
        Select file
      </button>
      {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
      {utkRes && <UEFIImage data={utkRes} />}
      {data && <LayoutBlocks layout={data.layout} />}
    </div>
  );
};

const App = () => (
  <div style={{ fontSize: 11 }}>
    <h1>
      utk-web - analyze a firmware image
    </h1>
    <Fmap />
  </div>
);

export default App;
