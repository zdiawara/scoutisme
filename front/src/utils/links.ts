const UTILITAIRES = "/utilitaires";
const PERSONNES = "/personnes";
const ORGANISATIONS = "/organisations";

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
  utilitaires: {
    base: UTILITAIRES,
  },
};
