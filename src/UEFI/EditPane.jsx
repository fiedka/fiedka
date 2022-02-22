import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, TextLine } from "@coalmines/indui";
import colors from "../util/colors";
import { EditContext } from "./EditContext";
import { UtkContext } from "../context/UtkContext";

// TODO: implement load/save

export const EditPaneView = ({ removals, remove, clear }) => {
  return (
    <div className="edit-pane">
      <menu>
        <TextLine>DXEs to remove</TextLine>
        <div>
          {/*
          <Button small disabled>
            Load 📁
          </Button>
          <Button small disabled={!removals.length} disabled>
            Save ⬇️
          </Button>
          */}
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
};

const EditPane = () => {
  const { removals, clear } = useContext(EditContext);
  const { remove: rm } = useContext(UtkContext);

  const remove = () => rm(removals.map(({ guid }) => guid));

  return <EditPaneView removals={removals} remove={remove} clear={clear} />;
};

export default EditPane;
