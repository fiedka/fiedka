import React, { useEffect, useState } from "react";
import { Button, Divider, Infobar, TextLine } from "@coalmines/indui";
import { useFilePicker } from "use-file-picker";
import wasm from "./main.go";
import { globalStyle, blockStyle } from "./global-style";
import { UtkContext } from "./context/UtkContext";
import logo from "./img/art/fiedka.svg";
import Feedback, { renderFeedback } from "./Analysis/Feedback";
import Main from "./Analysis/Main";
import { download } from "./util/download";
import { getMeta } from "./util/amd";
import FullScreenLoader from "./components/FullScreenLoader";
import Loader from "./components/Loader";
import LinuxBoot from "./UEFI/LinuxBoot";

const { fmap, cbfsana, utka, utkr, amdana, mklb } = wasm;

// use this instead of the real utka for testing only amdana
// const utka = () => Promise.reject("Skipping UEFI analysis");

const getParseFeedback = ({ status: s, reason: r }) =>
  s === "rejected" && r ? r : null;
const getParseData = ({ status: s, value: v }) =>
  s === "fulfilled" ? JSON.parse(v) : null;

const fullScreenLoader = <FullScreenLoader />;

const Analyze = () => {
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [fbuf, setFbuf] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [inProgress, setInProgress] = useState(false);
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
    setFeedback(null);
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
        fmap: getParseData(res[0]),
        uefi: getParseData(res[1]),
        amd: getParseData(res[2]),
        cbfs: getParseData(res[3]),
      });
      /*
      console.info({ fmap: getParseData(res[0]) });
      console.info({ uefi: getParseData(res[1]) });
      console.info({ amd: getParseData(res[2]) });
      console.info({ cbfs: getParseData(res[3]) });
      */
      setFeedback({
        uefi: getParseFeedback(res[1]),
        amd: getParseFeedback(res[2]),
        cbfs: getParseFeedback(res[3]),
      });
    } catch (e) {
      console.error(e);
      setError((errors || []).concat(e));
    }
  };

  const reanalyze = () => {
    analyze(fbuf, fbuf.byteLength);
  };

  const save = () => {
    download(`${fileName}.mod`, fbuf);
  };

  const remove = async (guids) => {
    setInProgress(true);
    setTimeout(async () => {
      try {
        const res = await utkr(
          new Uint8Array(fbuf),
          fbuf.byteLength,
          JSON.stringify(guids)
        );
        const w = JSON.parse(res);
        const u = JSON.parse(w.Res);
        setData({
          fmap: data.fmap,
          amd: data.amd,
          uefi: u,
        });
        try {
          const d = atob(w.Buf);
          const b = new Uint8Array(d.length);
          for (let i = 0; i < d.length; i++) {
            b[i] = d.charCodeAt(i);
          }
          setFbuf(b);
        } catch (e) {
          console.error("[utk err] buffer could not be unmarshaled", e, w.Buf);
        }
      } catch (e) {
        console.info("[utk err]", e);
        setError((errors || []).concat(e));
      } finally {
        setInProgress(false);
      }
    }, 100);
  };

  const linuxboot = async (kernelFile) => {
    console.info(`[utk]: replace 'BdsDxe' with kernel from file`);
    try {
      const res = await mklb(
        new Uint8Array(fbuf),
        fbuf.byteLength,
        new Uint8Array(kernelFile),
        kernelFile.byteLength
      );
      console.info(`[utk]: replacement done`);
      const w = JSON.parse(res);
      const u = JSON.parse(w.Res);
      setData({
        fmap: data.fmap,
        amd: data.amd,
        uefi: u,
      });
      try {
        const d = atob(w.Buf);
        const b = new Uint8Array(d.length);
        for (let i = 0; i < d.length; i++) {
          b[i] = d.charCodeAt(i);
        }
        setFbuf(b);
      } catch (e) {
        console.error("[utk err] buffer could not be unmarshaled", e, w.Buf);
      }
    } catch (e) {
      console.info("[utk err]", e);
      setError((errors || []).concat(e));
    }
  };

  const loadImage = () => openFileSelector();

  useEffect(() => {
    if (filesContent.length) {
      const f = filesContent[0].content;
      setFile(f);
      setFbuf(f);
      analyze(new Uint8Array(f), f.byteLength);
    }
  }, [filesContent]);

  const fileName = plainFiles.length > 0 ? plainFiles[0].name : "";

  return (
    <div>
      <menu>
        <div className="menu-left">
          <Infobar>analyze a firmware image</Infobar>
          <Button onClick={loadImage}>
            {loading ? <Loader>Analyzing...</Loader> : "Select file"}
          </Button>
          <Button onClick={reanalyze} disabled={!fbuf}>
            Reanalyze
          </Button>
          <Button onClick={save} disabled={!fbuf}>
            Save
          </Button>
          {file && <LinuxBoot onSelectFile={linuxboot} />}
        </div>
        <div className="menu-right">
          {data && data.amd && (
            <Feedback label="Outline">
              <pre>{JSON.stringify(getMeta(data.amd), null, 2)}</pre>
            </Feedback>
          )}
          <Feedback label="Feedback">
            {renderFeedback(feedback, error)}
          </Feedback>
        </div>
      </menu>
      {data ? (
        <>
          <Divider />
          <UtkContext.Provider value={{ remove }}>
            <Main data={data} fileName={fileName} />
          </UtkContext.Provider>
        </>
      ) : (
        <main>
          <figure>
            <img src={logo} />
            <figcaption>
              <TextLine>Fiedka the Firmware Editor</TextLine>
            </figcaption>
          </figure>
        </main>
      )}
      {inProgress && fullScreenLoader}
      <style jsx>{`
        menu {
          display: flex;
          justify-content: space-between;
        }
        .menu-left,
        .menu-right {
          display: flex;
          column-gap: 15px;
          align-items: center;
        }
        main,
        figure {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }
        main {
          min-height: 400px;
        }
        img {
          width: 200px;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

const App = () => (
  <div>
    <Analyze />
    <style jsx global>
      {globalStyle}
    </style>
    <style jsx global>
      {blockStyle}
    </style>
    <style jsx global>
      {`
        pre {
          min-width: 350px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}
    </style>
  </div>
);

export default App;
