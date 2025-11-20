import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import {HistoryPage} from "../pages/HistoryPage.tsx";
import {AboutConverter} from "../pages/AboutConverter.tsx";
import {NotFoundPage} from "../pages/NotFoundPage.tsx";
import "./styles/style.css";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: App },
      {
        path: "/History-page",
        Component: HistoryPage,
      },

      {
        path: "*",
        Component: NotFoundPage,
      },
      {
        path: "/about",
        Component: AboutConverter,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
