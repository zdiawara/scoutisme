import { Dispatch, SetStateAction } from "react";
import { SelectItem } from "./form.type";

export type RequestParam = Record<string, any>;

export interface ListPaginated<T> {
  data: T[];
  meta: {
    total: number;
    last_page: number;
    total_page: number;
    page: number;
    current_page: number;
  };
}

export interface Filter {
  page: number;
  size: number;
}

export type FilterParam = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  setFilterByKey: (key: string, value: any) => void;
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

export interface MessageFilter extends Filter {
  search: string | null;
}
