import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { GlobalProvider } from "./context/GlobalState";
import App from "./App";

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);
