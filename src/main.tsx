import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";
import "./i18n";
import { setupI18nRouterSync } from "./i18n";

const router = getRouter();
setupI18nRouterSync(router);

const rootElement = typeof document !== "undefined" ? document.getElementById("root") : null;
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
