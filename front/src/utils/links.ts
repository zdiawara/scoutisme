const PERSONNES = "/personnes";
const ORGANISATIONS = "/organisations";
const INSTANCES = "/instances";
const FONCTIONS = "/fonctions";
const TYPES_UNITES = "/types-unites";
const REF_FORMATIONS = "/ref-formations";
const EVENTS = "/events";
const MESSAGES = "/messages";

export const LINKS = {
  personnes: {
    base: PERSONNES,
    view: (id: string) => `${PERSONNES}/${id}`,
    edit: (id: string) => `${PERSONNES}/${id}/edit`,
    create: `${PERSONNES}/create`,
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

  dashbords: {
    base: "dashbords",
    personnes: "/dashbords/personnes",
    organisations: "/dashbords/organisations",
  },
};
