import { SelectItem } from "types/form.type";
import { RequestParam } from "types/request.type";
import { format, parse } from "date-fns";

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
};

const toDate = (pattern: string, date?: string) => {
  return date ? parse(date, pattern, new Date()) : undefined;
};

export const dateParser = {
  toDate: (date?: string) => {
    return toDate("yyyy-MM-dd", date);
  },
};
