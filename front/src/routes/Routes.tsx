import React, { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "layout";
import { LINKS } from "utils";

const loading = () => <div className=""></div>;

export const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={loading()}>
      <Component {...props} />
    </Suspense>
  );

const ListScout = Loadable(lazy(() => import("pages/scouts/ListScout")));
const ViewScout = Loadable(lazy(() => import("pages/scouts/ViewScout")));
const CreateScout = Loadable(lazy(() => import("pages/scouts/CreateScout")));

const ListOrganisation = Loadable(
  lazy(() => import("pages/organisations/ListOrganisation"))
);

const ListUtilitaire = Loadable(
  lazy(() => import("pages/utilitaires/ListUtilitaire"))
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path={LINKS.scouts.base} element={<Outlet />}>
        <Route index element={<ListScout />} />
        <Route element={<CreateScout />} path="create" />
        <Route element={<ViewScout />} path=":id" />
      </Route>
      <Route path={LINKS.organisations.base} element={<Outlet />}>
        <Route index element={<ListOrganisation />} />
        {/* <Route element={<CreateScout />} path="create" /> */}
        {/* <Route element={<ViewScout />} path=":id" /> */}
      </Route>
      <Route path={LINKS.utilitaires.base} element={<Outlet />}>
        <Route index element={<ListUtilitaire />} />
        {/* <Route element={<CreateScout />} path="create" /> */}
        {/* <Route element={<ViewScout />} path=":id" /> */}
      </Route>
    </Route>
  )
);
