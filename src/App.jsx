import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Infobar, TextLine } from "@coalmines/indui";
import { useFilePicker } from "use-file-picker";
import { globalStyle, blockStyle } from "./global-style";

import gowasm from "./main.go";
import * as rswasm from "./rs/pkg";

import { UtkContext } from "./context/UtkContext";

import logo from "./img/art/fiedka.svg";
import { downloadU8a, downloadJson } from "./util/download";

import FullScreenLoader from "./components/FullScreenLoader";
import Loader from "./components/Loader";

import LinuxBoot from "./UEFI/LinuxBoot";

import { uefiActions } from "./UEFI/store";
import { cbfsActions } from "./CBFS/store";
import { mefsActions } from "./MEFS/store";
import { amdActions, selectAmdMeta } from "./PSP/store";
import { fmapActions } from "./Flash/store";

import Main from "./Analysis/Main";
import Feedback, { renderFeedback } from "./Analysis/Feedback";

const stub = (name) => () => Promise.reject(`Skipping ${name}`);

const DO_UTK = false;
const DO_AMD = false;
const DO_CBFS = false;
const DO_MEFS = true;
const DO_ROMULAN = false;

// Go based API
const { fmap, utkr, mklb } = gowasm;
const cbfsana = DO_CBFS ? gowasm.cbfsana : stub("cbfs");
const amdana = DO_AMD ? gowasm.amdana : stub("utk amd");
const utka = DO_UTK ? gowasm.utka : stub("utk uefi");

// Rust based API
const mefs = DO_MEFS ? rswasm.mefs : stub("mefs");
const romulan = DO_ROMULAN ? rswasm.romulan : stub("romulan");

const getParseFeedback = ({ status: s, reason: r }) =>
  s === "rejected" && r ? r : null;
const getParseData = ({ status: s, value: v }) =>
  s === "fulfilled" ? JSON.parse(v) : null;
const getData = ({ status: s, value: v }) =>
  s === "fulfilled" ? v : null;

const fullScreenLoader = <FullScreenLoader />;

const DEBUG_ROMULAN = true;
const DEBUG_ME_FS = true;

const Analyze = () => {
  const dispatch = useDispatch();
  const store = useSelector((s) => s);
  const amdMeta = useSelector(selectAmdMeta);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [fbuf, setFbuf] = useState(null);
  const [file, setFile] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const { openFilePicker, filesContent, loading, errors, plainFiles } =
    useFilePicker({
      multiple: false,
      readAs: "ArrayBuffer",
      maxFileSize: 65, // megabytes
    });

  const setData = (d) => {
    if (!d) {
      dispatch(uefiActions.clear());
      dispatch(amdActions.clear());
      dispatch(cbfsActions.clear());
      dispatch(fmapActions.clear());
      dispatch(mefsActions.clear());
      return;
    }

    if (DEBUG_ROMULAN) {
      console.log("ROMULAN: ", { ...d.amd });
    }

    if (DEBUG_ME_FS) {
      console.log("ME FS: ", { ...d.mefs });
    }

    dispatch(uefiActions.init(d.uefi));
    // dispatch(amdActions.init(d.amd));
    dispatch(amdActions.set(d.amd));
    dispatch(cbfsActions.init(d.cbfs));
    dispatch(fmapActions.init(d.fmap));
    dispatch(mefsActions.init(d.mefs));
  };

  const saveData = () => {
    downloadJson("export.json", store);
  };

  const analyze = async (indata, size) => {
    setInProgress(true);
    setData(null);
    setFeedback(null);
    setError(null);

    console.info("START", new Date());
    setTimeout(async () => {
      try {
        const res = await Promise.allSettled([
          // TODO: fmap should never fail, what should we do if it does though?
          fmap(indata, size),
          utka(indata, size),
          amdana(indata, size),
          cbfsana(indata, size),
          mefs([...indata]),
          romulan([...indata]),
        ]);

        // const rparsed = getData(res[2]);
        // TODO: create metadata from efs
        // const meta = {};
        // const { dirs } = rparsed;

        const m = getData(res[4]);
        setData({
          fmap: getParseData(res[0]),
          uefi: getParseData(res[1]),
          amd: getParseData(res[2]),
          cbfs: getParseData(res[3]),
          // TODO: metadata from header
          mefs: m ? m.fpt : null,
        });
        setFeedback({
          uefi: getParseFeedback(res[1]),
          amd: getParseFeedback(res[2]),
          cbfs: getParseFeedback(res[3]),
          // TODO
          mefs: null,
        });
      } catch (e) {
        console.error(e);
        setError((errors || []).concat(e));
      } finally {
        console.info("DONE:", new Date());
        setInProgress(false);
      }
    }, 100);
  };

  const reanalyze = useCallback(() => {
    if (fbuf) {
      analyze(new Uint8Array(fbuf), fbuf.byteLength);
    }
  }, [fbuf]);

  const save = () => {
    downloadU8a(`${fileName}.mod`, fbuf);
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
        dispatch(uefiActions.init(u));
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
      dispatch(uefiActions.init(u));
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

  useEffect(() => {
    if (filesContent.length) {
      const f = filesContent[0].content;
      setFile(f);
      setFbuf(f);
    }
  }, [filesContent]);

  useEffect(() => {
      reanalyze();
  }, [reanalyze]);

  const fileName = plainFiles.length > 0 ? plainFiles[0].name : "";

  const pending = inProgress || loading;

  // FIXME
  const outline = JSON.stringify(amdMeta, null, 2);

  return (
    <div>
      <menu>
        <div className="menu-left">
          <Infobar>analyze a firmware image</Infobar>
          <Button onClick={openFilePicker}>
            {loading ? <Loader>Analyzing...</Loader> : "Select file 📁"}
          </Button>
          <Button onClick={reanalyze} disabled={!fbuf}>
            Reanalyze 🕵️
          </Button>
          <Button onClick={save} disabled={!fbuf}>
            Save 💾
          </Button>
          {file && <LinuxBoot onSelectFile={linuxboot} />}
        </div>
        <div className="menu-right">
          <Button>FAUCET 🚰</Button>
          <Button onClick={saveData} disabled={!store}>
            Export ⬇️
          </Button>
          {outline && (
            <Feedback label="Outline ℹ️">
              <pre>{outline}</pre>
            </Feedback>
          )}
          <Feedback label="Feedback 🤷">
            {renderFeedback(feedback, error)}
          </Feedback>
        </div>
      </menu>
      {fileName && !(pending) ? (
        <>
          <Divider />
          <UtkContext.Provider value={{ remove }}>
            <Main fileName={fileName} />
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
      {pending && fullScreenLoader}
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
