import { Outlet } from "react-router-dom";
import { FilterProvider } from "context/FIlterContext";
import {
  FonctionFilter,
  MessageFilter,
  OrganisationFilter,
  PaiementFilter,
  PersonneFilter,
} from "types/request.type";

export const PersonneOutlet = () => {
  const filter: PersonneFilter = {
    etat: "tous",
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
