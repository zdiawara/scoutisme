import { Dispatch, SetStateAction } from "react";
import { SelectItem } from "./form.type";

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

export interface FonctionFilter extends Filter {
  search?: string;
  nature?: SelectItem;
}
