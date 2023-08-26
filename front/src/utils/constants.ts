export const QUERY_KEY = {
  personnes: "personnes",
  organisations: "organisations",
  attributions: "attributions",
  fonctions: "fonctions",
};

export const MASK = {
  telephone: [/\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/],
  number: [/^\d+/],
};

export const NATURE = {
  unite: "unite",
  groupe: "groupe",
  region: "region",
  national: "national",
};
