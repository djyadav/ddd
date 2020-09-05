import React from "react";
import ReactDOM from "react-dom";
import "styles/_index.scss";
import { populateDummyData } from "utils";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
populateDummyData();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
