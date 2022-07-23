import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./_utils";
import App from "./App";
import store from "./store";

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(".app")
  );
}

render();
