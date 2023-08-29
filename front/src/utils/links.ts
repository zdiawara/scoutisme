const PERSONNES = "/personnes";
const ORGANISATIONS = "/organisations";
const FONCTIONS = "/fonctions";
const TYPES_UNITES = "/types-unites";
const REF_FORMATIONS = "/ref-formations";

export const LINKS = {
  personnes: {
    base: PERSONNES,
    view: (id: string) => `${PERSONNES}/${id}`,
    edit: (id: string) => `${PERSONNES}/${id}/edit`,
  },
  organisations: {
    base: ORGANISATIONS,
    view: (id: string) => `${ORGANISATIONS}/${id}`,
    edit: (id: string) => `${ORGANISATIONS}/${id}/edit`,
    create: `${ORGANISATIONS}/create`,
  },
  fonctions: {
    base: FONCTIONS,
  },
  types_unites: {
    base: TYPES_UNITES,
  },
  ref_formations: {
    base: REF_FORMATIONS,
  },
};
