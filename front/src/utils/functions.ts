import { SelectItem } from "types/form.type";
import { RequestParam } from "types/request.type";
import { NATURE } from "./constants";

export const requestParams = (params?: RequestParam) => {
  const entries = Object.entries(params || {}).filter(
    (entry) => entry[1] !== undefined && entry[1] !== null && entry[1] !== ""
  );
  if (entries.length > 0) {
    return `?${entries.map((entry) => `${entry[0]}=${entry[1]}`).join("&")}`;
  }
  return "";
};

export const selectHelper = {
  getValue: (item?: SelectItem) => {
    return item?.value || null;
  },
};

/**
 *
 * @param codeNature
 * @returns
 */
export const buildNatureColor = (codeNature: string) => {
  switch (codeNature) {
    case NATURE.unite:
      return "primary";
    case NATURE.groupe:
      return "secondary";
    case NATURE.region:
      return "info";
    case NATURE.national:
      return "warning";
  }
};
