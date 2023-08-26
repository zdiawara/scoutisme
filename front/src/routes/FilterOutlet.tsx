import { Outlet } from "react-router-dom";
import { FilterProvider } from "context/FIlterContext";
import {
  FonctionFilter,
  OrganisationFilter,
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
  };
  return (
    <FilterProvider initial={filter}>
      <Outlet />
    </FilterProvider>
  );
};
