export type OrganisationParent = {
  id: string;
  nom: string;
  nature: {
    id: string;
    nom: string;
  };
};

export type OrganisationResource = {
  id: string;
  nom: string;
  code: string;
  type?: TypeOrganisationResource;
  nature: NatureResource;
  parent?: OrganisationResource;
  ville?: VilleResource;
  etat: string;
  adresse?: string;
  parents?: Array<OrganisationParent>;
  enfants?: OrganisationResource[];
};

export type TypeOrganisationResource = {
  id: string;
  nom: string;
  code: string;
};

export type RefFormationResource = {
  id: string;
  nom: string;
};

export type NatureResource = {
  id: string;
  nom: string;
  code: string;
};

export type VilleResource = {
  id: string;
  nom: string;
  code: string;
};
