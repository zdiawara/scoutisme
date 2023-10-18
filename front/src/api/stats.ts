import { StatOrgaNature } from "types/stats.type";
import { requestGet } from "./request";

const base = "stats";

export const statApi = {
  organisations: {
    byRegion: () => requestGet<{ data: any }>(`${base}/organisations/regions`),
    countAll: () =>
      requestGet<{ data: StatOrgaNature[] }>(`${base}/organisations`),
  },
};
