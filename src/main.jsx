import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter  basename="/crmdemo">
      <App />
    </BrowserRouter>
  // {/* </React.StrictMode> */}
);



