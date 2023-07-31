import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "./routes";
import ErrorPage from "./pages/error/ErrorPage";
import { ListPersonne } from "./pages/personnes/ListPersonne";
import { ViewPersonne } from "./pages/personnes/ViewPersonne";

import { Layout } from "./layout";
import { LINKS } from "./utils";

import "./styles/index.scss";
const Index = ReactDOM.createRoot(document.getElementById("app"));

/*const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/personnes",
                element: <ListPersonne />,
                loader: async ({ params, request, context }) => {
                    const data = await fetch(
                        "http://localhost:8000/api/personnes"
                    );
                    console.log("Loading personnes");
                    return data;
                },
            },
            {
                path: "/personnes/:personneId",
                element: <ViewPersonne />,
                loader: async ({ params, request, context }) => {
                    console.log("Loading a personne");
                    const data = await fetch(
                        `http://localhost:8000/api/personnes/${params.personneId}`
                    );
                    return data;
                },
            },
        ],
    },
]);*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path={LINKS.personnes.base} element={<Outlet />}>
        <Route
          index
          element={<ListPersonne />}
          loader={async ({ params, request, context }) => {
            const data = await fetch("http://localhost:9025/api/personnes");
            console.log("Loading personnes");
            return data;
          }}
        />
        <Route
          element={<ViewPersonne />}
          path=":personneId"
          loader={async ({ params, request, context }) => {
            console.log("Loading a personne");
            const data = await fetch(
              `http://localhost:9025/api/personnes/${params.personneId}`
            );
            return data;
          }}
        />
      </Route>
    </Route>
  )
);

Index.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
