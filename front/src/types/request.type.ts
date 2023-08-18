import { Dispatch, SetStateAction } from "react";

export type RequestParam = Record<string, any>;

export interface ListPaginated<T> {
  data: T[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
  };
}

export interface Filter {}

export type FilterParam = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export interface PersonneFilter extends Filter {
  search: string | null;
  etat: string | null;
  page: number;
  size: number;
}

export interface OrganisationFilter extends Filter {
  search: string | null;
}
