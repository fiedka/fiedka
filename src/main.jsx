import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./_utils";
import App from "./App";
import store from "./store";

const el = document.querySelector(".app");
const root = createRoot(el);

const AppWithProviders = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(<AppWithProviders />);
