export type OrganisationResource = {
  id: string;
  nom: string;
  code: string;
  type?: TypeOrganisationResource;
  nature: NatureResource;
  parent?: OrganisationResource;
  etat: string;
};

export type TypeOrganisationResource = {
  id: string;
  nom: string;
  code: string;
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
