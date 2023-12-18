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

export const PersonneOutlet = () => {
  const auth = useAuth();

  const organisation = auth.user?.personne?.organisation;
  const filter: PersonneFilter = {
    search: "",
    page: 1,
    size: 10,
    organisation: organisation
      ? {
          value: organisation.id,
          label: organisation.nom,
        }
      : undefined,
  };
  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};

export const OrganisationOutlet = () => {
  const filter: OrganisationFilter = {
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
    etat: null,
  };
  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};
