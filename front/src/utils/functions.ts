import { RequestParam } from "types/request.type";

export const requestParams = (params?: RequestParam) => {
  const entries = Object.entries(params || {}).filter(
    (entry) => entry[1] !== undefined && entry[1] !== null && entry[1] !== ""
  );
  if (entries.length > 0) {
    return `?${entries.map((entry) => `${entry[0]}=${entry[1]}`).join("&")}`;
  }
  return "";
};
