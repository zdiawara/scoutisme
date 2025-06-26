import { FC, Suspense, lazy } from "react";
import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Layout } from "layout";
import { LINKS } from "utils/links";
// import { Acces } from "pages/utilitaires/acces/Acces";
import { HomePage } from "pages/home";
// import { Acces } from "pages/utilitaires/acces/Acces";

const loading = () => <div className=""></div>;

export const Loadable = (Component: FC) => () =>
  (
    <Suspense fallback={loading()}>
      <Component />
    </Suspense>
  );

const RechercherPersonne = Loadable(lazy(() => import("pages/personnes/rechercher/RechercherPersonne")));
const ViewPersonne = Loadable(lazy(() => import("pages/personnes/ViewPersonne")));
// const CreatePersonne = Loadable(lazy(() => import("pages/personnes/CreatePersonne")));
// const EditPersonne = Loadable(lazy(() => import("pages/personnes/EditPersonne")));

const RechercherOrganisation = Loadable(lazy(() => import("pages/organisations/rechercher/RechercheOrganisation")));
const CreateOrganisation = Loadable(lazy(() => import("pages/organisations/CreateOrganisation")));
// const EditOrganisation = Loadable(lazy(() => import("pages/organisations/EditOrganisation")));
const ViewOrganisation = Loadable(lazy(() => import("pages/organisations/ViewOrganisation")));

const RechercherMail = Loadable(lazy(() => import("pages/messages/rechercher/RechercherMail")));
const CreateMessage = Loadable(lazy(() => import("pages/messages/CreateMessage")));
const ViewMessage = Loadable(lazy(() => import("pages/messages/ViewMessage")));

// const ListEvent = Loadable(lazy(() => import("pages/events/ListEvent")));

// const ListInstance = Loadable(lazy(() => import("pages/utilitaires/instances/ListInstance")));
// const ListFonction = Loadable(lazy(() => import("pages/utilitaires/fonctions/ListFonction")));
// const ListRefFormation = Loadable(lazy(() => import("pages/utilitaires/ref-formations/ListRefFormation")));
// const ListTypeUnite = Loadable(lazy(() => import("pages/utilitaires/types-unites/ListTypeUnite")));

// const OrganisationDashBord = Loadable(lazy(() => import("pages/dashbords/organisations/OrganisationDashBord")));

// const ScoutDashbord = Loadable(lazy(() => import("pages/dashbords/personnes/ScoutDashbord")));

// const CotisationDashbord = Loadable(lazy(() => import("pages/dashbords/cotisations/CotisationDashBoard")));

const RechercherPaiement = Loadable(lazy(() => import("pages/paiements/rechercher/RechercherPaiement")));

const Login = Loadable(lazy(() => import("pages/auth/Login")));
const Logout = Loadable(lazy(() => import("pages/auth/Logout")));
const Register = Loadable(lazy(() => import("pages/auth/Register")));

// const MonProfil = Loadable(lazy(() => import("pages/compte/MonProfil")));
// const MonOrganisation = Loadable(lazy(() => import("pages/compte/MonOrganisation")));

const Parametres = Loadable(lazy(() => import("pages/parametres/Parametres")));
const RechercherFormation = Loadable(lazy(() => import("pages/parametres/formations/rechercher/RechercherFormation")));
const RechercherFonction = Loadable(lazy(() => import("pages/parametres/fonctions/search/RechercherFonction")));
const RechercherCotisation = Loadable(lazy(() => import("pages/parametres/cotisations/search/RechercherCotisation")));
const RechercherTypeUnite = Loadable(lazy(() => import("pages/parametres/types-unites/search/RechercherTypeUnite")));

const RechercherRole = Loadable(lazy(() => import("pages/parametres/roles/search/RechercherRole")));
const ConsulterRole = Loadable(lazy(() => import("pages/parametres/roles/view/ConsulterRole")));

const RechercherUtilisateur = Loadable(
  lazy(() => import("pages/parametres/utilisateurs/search/RechercherUtilisateur"))
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={LINKS.login} element={<Login />} />
      <Route path={LINKS.register} element={<Register />} />
      <Route path="logout" element={<Logout />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route path={LINKS.organisation.base} element={<MonOrganisation />} />
        <Route path={LINKS.profil.base} element={<Outlet />}>
          <Route index element={<MonProfil />} />
        </Route> */}
        <Route path={LINKS.personnes.base} element={<Outlet />}>
          <Route index element={<RechercherPersonne />} />
          <Route element={<ViewPersonne />} path=":id" />
          {/* <Route element={<CreatePersonne />} path="create" />
          <Route
            element={<EditPersonne />}
            path=":id/edit"
            loader={({ params }) => {
              return personneApi.findById(params.id!);
            }}
          /> */}
        </Route>
        <Route path={LINKS.organisations.base} element={<Outlet />}>
          <Route index element={<RechercherOrganisation />} />
          <Route element={<CreateOrganisation />} path="create" />
          <Route element={<ViewOrganisation />} path=":id" />
          {/* <Route
            element={<EditOrganisation />}
            path=":id/edit"
            loader={({ params }) => {
              return organisationApi.findById(params.id!);
            }}
          /> */}
        </Route>

        {/* <Route path={LINKS.events.base} element={<Outlet />}>
          <Route index element={<ListEvent />} />
        </Route> */}
        {/* <Route path={LINKS.instances.base} element={<Outlet />}>
          <Route index element={<ListInstance />} />
        </Route> */}
        <Route path={LINKS.messages.base} element={<Outlet />}>
          <Route index element={<RechercherMail />} />
          <Route path="create" element={<CreateMessage />} />
          <Route path=":id" element={<ViewMessage />} />
        </Route>
        <Route path={LINKS.paiements.base} element={<Outlet />}>
          <Route index element={<RechercherPaiement />} />
        </Route>
        {/* <Route path={LINKS.fonctions.base} element={<Outlet />}>
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
        </Route> */}

        <Route path={LINKS.dashbords.base} element={<Outlet />}>
          {/* <Route path="organisations" element={<OrganisationDashBord />} />
          <Route path="scouts" element={<ScoutDashbord />} />
          <Route path="cotisations" element={<CotisationDashbord />} /> */}
        </Route>

        {/* <Route path={LINKS.acces.base} element={<Outlet />}>
          <Route index element={<Acces />} />
        </Route> */}
        <Route path={LINKS.parametres.base}>
          <Route index element={<Parametres />} />
          <Route path={LINKS.parametres.formations} element={<RechercherFormation />} />
          <Route path={LINKS.parametres.fonctions} element={<RechercherFonction />} />
          <Route path={LINKS.parametres.cotisations} element={<RechercherCotisation />} />
          <Route path={LINKS.parametres.typesUnites} element={<RechercherTypeUnite />} />
          <Route path={LINKS.parametres.roles} element={<RechercherRole />} />
          <Route path={LINKS.parametres.roles + "/:id"} element={<ConsulterRole />} />
          <Route path={LINKS.parametres.utilisateurs} element={<RechercherUtilisateur />} />
        </Route>
      </Route>
    </>
  )
);
