import React from "react";
import ReactDOM from "react-dom";
import "./_utils";
import App from "./App";

function render() {
  ReactDOM.render(<App />, document.querySelector(".app"));
}

render();
