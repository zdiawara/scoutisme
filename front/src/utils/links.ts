const PERSONNES = "/personnes";
const ORGANISATIONS = "/organisations";
const INSTANCES = "/instances";
const FONCTIONS = "/fonctions";
const TYPES_UNITES = "/types-unites";
const REF_FORMATIONS = "/ref-formations";
const EVENTS = "/events";
const MESSAGES = "/messages";
const PAIEMENTS = "/paiements";
const COTISATIONS = "/cotisations";

export const LINKS = {
  home: "/",
  personnes: {
    base: PERSONNES,
    view: (id: string) => `${PERSONNES}/${id}`,
    edit: (id: string) => `${PERSONNES}/${id}/edit`,
    create: `${PERSONNES}/create`,
  },
  organisation: {
    base: "mon-organisation",
  },
  organisations: {
    base: ORGANISATIONS,
    view: (id: string) => `${ORGANISATIONS}/${id}`,
    edit: (id: string) => `${ORGANISATIONS}/${id}/edit`,
    create: `${ORGANISATIONS}/create`,
  },
  messages: {
    base: MESSAGES,
    view: (id: string) => `${MESSAGES}/${id}`,
    edit: (id: string) => `${MESSAGES}/${id}/edit`,
    create: `${MESSAGES}/create`,
  },
  events: {
    base: EVENTS,
    view: (id: string) => `${EVENTS}/${id}`,
    edit: (id: string) => `${EVENTS}/${id}/edit`,
    create: `${EVENTS}/create`,
  },
  instances: {
    base: INSTANCES,
    view: (id: string) => `${INSTANCES}/${id}`,
    edit: (id: string) => `${INSTANCES}/${id}/edit`,
    create: `${INSTANCES}/create`,
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
  paiements: {
    base: PAIEMENTS,
  },
  cotisations: {
    base: COTISATIONS,
  },
  acces: {
    base: "/acces",
  },
  dashbords: {
    base: "dashbords",
    scouts: "/dashbords/scouts",
    cotisations: "/dashbords/cotisations",
    adultes: "/dashbords/adultes",
    organisations: "/dashbords/organisations",
  },
};
