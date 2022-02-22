import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Divider, TextLine } from "@coalmines/indui";
import colors from "../util/colors";

export const renderFeedback = (feedback, errors) => {
  if (!(feedback || errors)) {
    return null;
  }

  return (
    <>
      {feedback && (
        <section className="feedback">
          <TextLine>
            <h2>Analysis Feedback</h2>
          </TextLine>
          <dl>
            {Object.entries(feedback)
              .filter(([_, v]) => v)
              .map(([k, v]) => (
                <li key={k}>
                  {k}: {v}
                </li>
              ))}
          </dl>
        </section>
      )}
      {feedback && errors && <Divider />}
      {errors && (
        <section className="feedback">
          <TextLine>
            <h2>Errors</h2>
          </TextLine>
          {errors.map((e) => (
            <div key={e}>{e}</div>
          ))}
        </section>
      )}
      <style jsx>{`
        .feedback {
          width: 400px;
          display: flex;
          flex-direction: column;
          row-gap: 12px;
        }
        .feedback > :global(*) {
          width: 100%;
        }
        dl {
          list-style: none;
        }
        li {
          margin: 3px 0;
          padding: 3px;
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

const Feedback = ({ children, label }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  const disabled = !children;

  return (
    <div className="feedback-expander">
      <Button onClick={toggle} disabled={disabled}>
        {label}
      </Button>
      <div className="feedback-content">{children}</div>
      <style jsx>{`
        .feedback-expander {
          position: relative;
        }
        .feedback-content {
          position: absolute;
          top: 40px;
          right: 0;
          display: ${open ? "block" : "none"};
          background-color: ${colors[0]};
          border: 1px solid ${colors[8]};
          padding: 2px 10px;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

Feedback.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default Feedback;
