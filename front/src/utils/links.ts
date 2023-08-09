const UTILITAIRES = "/utilitaires";
const SCOUTS = "/scouts";
const ORGANISATIONS = "/organisations";

export const LINKS = {
  scouts: {
    base: SCOUTS,
    view: (id: string) => `${SCOUTS}/${id}`,
  },
  organisations: {
    base: ORGANISATIONS,
    view: (id: string) => `${ORGANISATIONS}/${id}`,
  },
  utilitaires: {
    base: UTILITAIRES,
  },
};
