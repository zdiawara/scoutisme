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
  getValue: (item?: SelectItem | null) => {
    return item?.value || null;
  },
  getValueFromJson: (item: any) => (item ? selectHelper.getValue(JSON.parse(item)) : null),
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

export const buildPerimetres = (codeNature: string) => {
  let perimetres = ["national", "region", "groupe", "unite"];
  if (codeNature === "region") {
    perimetres = perimetres.filter((n) => n !== "national");
  } else if (codeNature === "groupe") {
    perimetres = perimetres.filter((n) => !["national", "region"].includes(n));
  } else if (codeNature === "unite") {
    perimetres = perimetres.filter((n) => !["national", "region", "groupe"].includes(n));
  }

  return perimetres;
};
