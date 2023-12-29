import { Outlet } from "react-router-dom";
import { FilterProvider } from "context/FIlterContext";
import {
  FonctionFilter,
  MessageFilter,
  OrganisationFilter,
  PaiementFilter,
  PersonneFilter,
} from "types/request.type";
import { useAuth } from "hooks";
import { OrganisationResource } from "types/organisation.type";

const computeOrganisation = (organisation?: OrganisationResource) => {
  if (organisation) {
    return {
      value: organisation.id,
      label: organisation.nom,
    };
  }
  return undefined;
};

export const PersonneOutlet = () => {
  const auth = useAuth();
  const isAdmin = auth.userDroit?.isAdmin;
  const personne = auth.user?.personne;

  const filter: PersonneFilter = {
    search: "",
    page: 1,
    size: 10,
    perimetres: [],
  };

  if (!isAdmin) {
    filter.organisation = computeOrganisation(personne?.organisation);
    filter.perimetres = auth.user?.role?.perimetres || [];
  }

  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};

export const OrganisationOutlet = () => {
  const auth = useAuth();
  const isAdmin = auth.userDroit?.isAdmin;
  const personne = auth.user?.personne;

  const filter: OrganisationFilter = {
    search: "",
    page: 1,
    size: 10,
    perimetres: [],
  };

  if (!isAdmin) {
    filter.organisation = computeOrganisation(personne?.organisation);
    filter.perimetres = auth.user?.role?.perimetres || [];
  }

  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};

export const FonctionOutlet = () => {
  const filter: FonctionFilter = {
    search: "",
    page: 1,
    size: 10,
  };
  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};

export const MessageOutlet = () => {
  const filter: MessageFilter = {
    search: "",
    page: 1,
    size: 10,
  };
  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};

export const PaiementOutlet = () => {
  const filter: PaiementFilter = {
    page: 1,
    size: 10,
  };
  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};
