import { StatOrgaNature } from "types/stats.type";
import { requestGet } from "./request";

const base = "stats";

export const statApi = {
  organisations: {
    byRegion: () => requestGet<{ data: any }>(`${base}/organisations/regions`),
    countAll: () =>
      requestGet<{ data: StatOrgaNature[] }>(`${base}/organisations`),
  },

  personnes: {
    byRegion: () =>
      requestGet<{
        data: Array<Record<string, any>>;
        headers: Array<{ nom: string; code: string }>;
      }>(`${base}/scouts/regions`),

    cotisationScoutByRegion: () =>
      requestGet<{
        data: Array<Record<string, any>>;
        headers: Array<{ nom: string; code: string }>;
        headers_2: Array<{ nom: string; code: string }>;
      }>(`${base}/scouts/cotisations`),
  },
};
