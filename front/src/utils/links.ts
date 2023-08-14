const UTILITAIRES = "/utilitaires";
const PERSONNES = "/personnes";
const ORGANISATIONS = "/organisations";

export const LINKS = {
  personnes: {
    base: PERSONNES,
    view: (id: string) => `${PERSONNES}/${id}`,
  },
  organisations: {
    base: ORGANISATIONS,
    view: (id: string) => `${ORGANISATIONS}/${id}`,
    create: `${ORGANISATIONS}/create`,
  },
  utilitaires: {
    base: UTILITAIRES,
  },
};
