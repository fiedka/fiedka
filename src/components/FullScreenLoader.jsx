import React from "react";
import { Infobar, LoadingAnimation } from "@coalmines/indui";
import flashChip from "../img/art/flash.svg";
import colors from "../util/colors";

const FullScreenLoader = () => (
  <div className="wrapper">
    <Infobar>
      Operation in progress
      <div className="flash-chip">
        <LoadingAnimation type="swing" duration="3.7s">
          <img src={flashChip} />
        </LoadingAnimation>
      </div>
    </Infobar>
    <style jsx>{`
      .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
      }
      .flash-chip {
        background-color: ${colors[25]};
        width: 120px;
        height: 120px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        height: 96px;
      }
    `}</style>
  </div>
);

export default FullScreenLoader;
