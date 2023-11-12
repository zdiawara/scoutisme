import { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "layout";
import { LINKS } from "utils";
import {
  FonctionOutlet,
  MessageOutlet,
  OrganisationOutlet,
  PaiementOutlet,
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

const ListInstance = Loadable(
  lazy(() => import("pages/utilitaires/instances/ListInstance"))
);

const ListMessage = Loadable(lazy(() => import("pages/messages/ListMessage")));
const CreateMessage = Loadable(
  lazy(() => import("pages/messages/CreateMessage"))
);
const ViewMessage = Loadable(lazy(() => import("pages/messages/ViewMessage")));

const ListEvent = Loadable(lazy(() => import("pages/events/ListEvent")));

const ListFonction = Loadable(
  lazy(() => import("pages/utilitaires/fonctions/ListFonction"))
);
const ListRefFormation = Loadable(
  lazy(() => import("pages/utilitaires/ref-formations/ListRefFormation"))
);
const ListTypeUnite = Loadable(
  lazy(() => import("pages/utilitaires/types-unites/ListTypeUnite"))
);
const ListCotisation = Loadable(
  lazy(() => import("pages/utilitaires/cotisations/ListCotisation"))
);

const OrganisationDashBord = Loadable(
  lazy(() => import("pages/dashbords/organisations/OrganisationDashBord"))
);

const ScoutDashbord = Loadable(
  lazy(() => import("pages/dashbords/personnes/ScoutDashbord"))
);

const ListPaiement = Loadable(
  lazy(() => import("pages/paiements/ListPaiement"))
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
      <Route path={LINKS.events.base} element={<Outlet />}>
        <Route index element={<ListEvent />} />
      </Route>
      <Route path={LINKS.instances.base} element={<Outlet />}>
        <Route index element={<ListInstance />} />
      </Route>
      <Route path={LINKS.messages.base} element={<MessageOutlet />}>
        <Route index element={<ListMessage />} />
        <Route path="create" element={<CreateMessage />} />
        <Route path=":id" element={<ViewMessage />} />
      </Route>
      <Route path={LINKS.paiements.base} element={<PaiementOutlet />}>
        <Route index element={<ListPaiement />} />
      </Route>
      <Route path={LINKS.fonctions.base} element={<FonctionOutlet />}>
        <Route index element={<ListFonction />} />
      </Route>
      <Route path={LINKS.ref_formations.base} element={<Outlet />}>
        <Route index element={<ListRefFormation />} />
      </Route>
      <Route path={LINKS.types_unites.base} element={<Outlet />}>
        <Route index element={<ListTypeUnite />} />
      </Route>
      <Route path={LINKS.cotisations.base} element={<Outlet />}>
        <Route index element={<ListCotisation />} />
      </Route>

      <Route path={LINKS.dashbords.base} element={<Outlet />}>
        <Route path="organisations" element={<OrganisationDashBord />} />
        <Route path="scouts" element={<ScoutDashbord />} />
      </Route>
    </Route>
  )
);
