import { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "layout";
import { LINKS } from "utils";
import { OrganisationOutlet, PersonneOutlet } from "./FilterOutlet";
import { organisationApi } from "api";

const loading = () => <div className=""></div>;

export const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={loading()}>
      <Component {...props} />
    </Suspense>
  );

const ListPersonne = Loadable(
  lazy(() => import("pages/personnes/ListPersonne"))
);
const ViewPersonne = Loadable(
  lazy(() => import("pages/personnes/ViewPersonne"))
);
const CreatePersonne = Loadable(
  lazy(() => import("pages/personnes/CreatePersonne"))
);

const ListOrganisation = Loadable(
  lazy(() => import("pages/organisations/ListOrganisation"))
);
const CreateOrganisation = Loadable(
  lazy(() => import("pages/organisations/CreateOrganisation"))
);
const EditOrganisation = Loadable(
  lazy(() => import("pages/organisations/EditOrganisation"))
);
const ViewOrganisation = Loadable(
  lazy(() => import("pages/organisations/ViewOrganisation"))
);

const ListUtilitaire = Loadable(
  lazy(() => import("pages/utilitaires/ListUtilitaire"))
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path={LINKS.personnes.base} element={<PersonneOutlet />}>
        <Route index element={<ListPersonne />} />
        <Route element={<CreatePersonne />} path="create" />
        <Route element={<ViewPersonne />} path=":id" />
      </Route>
      <Route path={LINKS.organisations.base} element={<OrganisationOutlet />}>
        <Route index element={<ListOrganisation />} />
        <Route element={<CreateOrganisation />} path="create" />
        <Route element={<ViewOrganisation />} path=":id" />
        <Route
          element={<EditOrganisation />}
          path=":id/edit"
          loader={({ params }) => {
            return organisationApi.findById(params.id!);
          }}
        />
      </Route>
      <Route path={LINKS.utilitaires.base} element={<Outlet />}>
        <Route index element={<ListUtilitaire />} />
        {/* <Route element={<CreatePersonne />} path="create" /> */}
        {/* <Route element={<ViewPersonne />} path=":id" /> */}
      </Route>
    </Route>
  )
);
