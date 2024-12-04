import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { App as AntdApp } from "antd";
import { ConfigProvider } from "antd";
import { theme } from "./utils/theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <AntdApp style={{ height: "100vh" }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
