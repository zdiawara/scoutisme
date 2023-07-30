const PERSONNES = "/personnes";
const ORGANISATIONS = "/organisations";
const ROLES = "/roles";

export const LINKS = {
    personnes: {
        base: PERSONNES,
        view: (id) => `${PERSONNES}/${id}`,
    },
    organisations: {
        base: ORGANISATIONS,
        view: (id) => `${ORGANISATIONS}/${id}`,
    },
    roles: {
        base: ROLES,
        view: (id) => `${ROLES}/${id}`,
    },
};
