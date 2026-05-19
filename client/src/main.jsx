import 'react-quill/dist/quill.snow.css';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
  <App />
  <ToastContainer />
</>
  </React.StrictMode>
);