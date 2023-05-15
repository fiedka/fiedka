import React from "react";
import { Infobar,  } from "@coalmines/indui";
import colors from "../util/colors";

const LeakedKey = ({ leakedKey }) => (
  <div className="wrapper">
    <Infobar type={2}>
      This image has been signed with a leaked BootGuard key:
      <input disabled className="key" value={leakedKey} />
    </Infobar>
    <style jsx>{`
      .wrapper {
        width: 540px;
      }
      .key {
        margin-left: 8px;
        height: 100%;
        font-size: 20px;
        white-space: pre;
      }
    `}</style>
  </div>
);

export default LeakedKey;
