import { SelectItem } from "types/form.type";
import { RequestParam } from "types/request.type";
import { format, parse } from "date-fns";
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

export const dateFormater = {
  toBackPattern: (date?: Date, pattern?: string) => {
    try {
      return date ? format(date, pattern || "yyyy-MM-dd HH:mm:ss") : null;
    } catch (error) {
      return undefined;
    }
  },
  format: (date?: Date, pattern?: string) => {
    try {
      return date ? format(date, pattern || "yyyy-MM-dd HH:mm:ss") : null;
    } catch (error) {
      return undefined;
    }
  },
  formatStr: (date?: string, pattern?: string) => {
    return dateFormater.format(dateParser.parse(date), "dd/MM/yyyy");
  },
};

const toDate = (pattern: string, date?: string) => {
  return date ? parse(date, pattern, new Date()) : undefined;
};

export const dateParser = {
  toDate: (date?: string) => {
    return dateParser.parse(date, "yyyy-MM-dd");
  },
  toDateTime: (date?: string) => {
    return dateParser.parse(date, "yyyy-MM-dd HH:mm:ss");
  },
  parse: (date?: string, pattern?: string) => {
    return toDate(pattern || "yyyy-MM-dd HH:mm:ss", date);
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
