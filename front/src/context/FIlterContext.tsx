import { ReactNode, createContext, useState } from "react";
import { Filter, FilterParam } from "types/request.type";

export const FilterContext = createContext<FilterParam>({} as FilterParam);

type FilterProviderProps = {
  children: ReactNode;
  initial: Filter;
};

export function FilterProvider({ children, initial }: FilterProviderProps) {
  const [filter, setFilter] = useState<Filter>(initial);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
