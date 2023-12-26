export const QUERY_KEY = {
  personnes: "personnes",
  organisations: "organisations",
  organisation_enfants: "organisation/enfants",
  direction: "organisation/direction",
  attributions: "attributions",
  attribution_active: "attribution_active",
  fonctions: "fonctions",
  refFormations: "ref-formations",
  typesUnites: "types-unites",
  natures: "natures",
  messages: "messages",
  instances: "instances",
  events: "events",
  cotisations: "cotisations",
  paiements: "paiements",
  scouts: "scouts",
};

export const MASK = {
  telephone: [/\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/],
  number: [/^\d+/],
  numbers: [/^\d+/],
};

export const NATURE = {
  unite: "unite",
  groupe: "groupe",
  region: "region",
  national: "national",
};

export const TYPE_PERSONNES = {
  SCOUT: "scout",
  ADULTE: "adulte",
};

export const DATE_PATTERN = {
  dd_mm_yyyy_hh_mm_ss: "dd/MM/yyyy à HH:mm:ss",
  dd_mm_yyyy_hh_mm: "dd/MM/yyyy à HH:mm",
};

export const DEVISE = "FCFA";

export const ETAT_PAIEMENTS: Record<string, string> = {
  valide: "Validé",
  rejet: "Rejeté",
  en_attente: "En attente",
};
