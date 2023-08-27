import { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "layout";
import { LINKS } from "utils";
import {
  FonctionOutlet,
  OrganisationOutlet,
  PersonneOutlet,
} from "./FilterOutlet";
import { organisationApi, personneApi } from "api";

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
const EditPersonne = Loadable(
  lazy(() => import("pages/personnes/EditPersonne"))
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

const ListFonction = Loadable(
  lazy(() => import("pages/utilitaires/fonctions/ListFonction"))
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path={LINKS.personnes.base} element={<PersonneOutlet />}>
        <Route index element={<ListPersonne />} />
        <Route element={<CreatePersonne />} path="create" />
        <Route element={<ViewPersonne />} path=":id" />
        <Route
          element={<EditPersonne />}
          path=":id/edit"
          loader={({ params }) => {
            return personneApi.findById(params.id!);
          }}
        />
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
      <Route path={LINKS.fonctions.base} element={<FonctionOutlet />}>
        <Route index element={<ListFonction />} />
      </Route>
    </Route>
  )
);
