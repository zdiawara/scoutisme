import { StatOrgaNature } from "types/stats.type";
import { requestGet } from "./request";

const base = "stats";

type StatScout = {
  data: Array<Record<string, any>>;
  headers: Array<{ nom: string; code: string }>;
  headers_2: Array<{ nom: string; code: string }>;
};

type AdulteScout = {
  data: Array<{
    nom: string;
    code: string;
    unite: number;
    groupe: number;
    region: number;
    national: number;
  }>;
  header: { nom: string; code: string; unite: string; groupe: string; region: string; national: string };
};

export const statApi = {
  organisations: {
    byRegion: () => requestGet<{ data: any }>(`${base}/organisations/regions`),
    countAll: () => requestGet<{ data: StatOrgaNature[] }>(`${base}/organisations`),
  },

  personnes: {
    byRegion: () =>
      requestGet<{
        data: Array<Record<string, any>>;
        headers: Array<{ nom: string; code: string }>;
      }>(`${base}/scouts/regions`),

    byGenre: () =>
      requestGet<{
        data: Array<Record<string, any>>;
        headers: Array<{ nom: string; code: string }>;
        headers_2: Array<{ nom: string; code: string }>;
      }>(`${base}/scouts/genres`),

    statCotisation: () =>
      requestGet<{
        scouts: StatScout;
        adultes: AdulteScout;
      }>(`${base}/cotisations`),
  },
};
