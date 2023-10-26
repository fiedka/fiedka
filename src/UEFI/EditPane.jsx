import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, TextLine } from "@coalmines/indui";
import { useFilePicker } from "use-file-picker";
import colors from "../util/colors";
import { downloadJson } from "../util/download";
import { EditContext } from "./EditContext";
import schema from "./exportSchema";
import { UtkContext } from "../context/UtkContext";

export const EditPaneView = ({ removals = [], setRemovals, remove, clear }) => {
  const { openFilePicker, filesContent, errors } = useFilePicker({
    multiple: false,
    accept: [".json"],
    maxFileSize: 1, // megabyte
  });

  useEffect(() => {
    if (errors.length) {
      console.info("load errors", { errors });
    }
    if (filesContent.length) {
      const d = filesContent[0].content;
      try {
        const j = JSON.parse(d);
        const { error, value } = schema.validate(j);
        if (error) {
          throw new Error(error);
        }
        setRemovals(value.removals);
      } catch (e) {
        console.info("load error", { e });
      }
    }
  }, [filesContent]);

  const save = () => {
    try {
      // wrap in an object, so that it remains extensible; we will add
      // other information, such as name, annotations, hashes
      downloadJson("removals.json", { removals });
    } catch (e) {
      console.error("save error", { e });
    }
  };
  return (
    <div className="edit-pane">
      <menu>
        <TextLine>DXEs to remove</TextLine>
        <div>
          <Button small onClick={openFilePicker}>
            Load 📁
          </Button>
          <Button small disabled={!removals.length} onClick={save}>
            Save ⬇️
          </Button>
          <Button small disabled={!removals.length} onClick={clear}>
            Clear 🚫
          </Button>
          <Button small disabled={!removals.length} onClick={remove}>
            Apply ✅
          </Button>
        </div>
      </menu>
      {removals.length > 0 && (
        <section>
          <ul>
            {removals.map(({ name, guid }) => (
              <li key={guid}>
                {guid}
                {name && ` (${name})`}
              </li>
            ))}
          </ul>
        </section>
      )}
      <style jsx>{`
        .edit-pane {
          padding: 2px 10px;
          background-color: ${colors[0]};
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        menu {
          display: flex;
          justify-content: space-between;
          padding: 0;
        }
        section {
          flex-basis: fit-content;
          flex-shrink: 1;
          overflow-x: hidden;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
        }
        li {
          display: flex;
          flex-direction: column;
          flex: 1 0 100%;
        }
      `}</style>
    </div>
  );
};

EditPaneView.propTypes = {
  removals: PropTypes.array,
  remove: PropTypes.func,
  clear: PropTypes.func,
  setRemovals: PropTypes.func,
};

const EditPane = () => {
  const { removals, clear, setRemovals } = useContext(EditContext);
  const { remove: rm } = useContext(UtkContext);

  const remove = () => rm(removals.map(({ guid }) => guid));

  return <EditPaneView {...{ setRemovals, removals, remove, clear }} />;
};

export default EditPane;
