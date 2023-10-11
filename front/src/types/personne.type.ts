import {
  NatureResource,
  OrganisationResource,
  VilleResource,
} from "./organisation.type";

export type PersonneResource = {
  id: string;
  nom: string;
  code: string;
  prenom: string;
  type: string;
  date_naissance?: string;
  lieu_naissance?: string;
  date_adhesion: string;
  profession?: string;
  genre?: GenreResource;
  niveau_formation?: NiveauFormationResource;
  email: string;
  telephone?: string;
  fonction: string;
  etat: string;
  photo?: string;
  personne_a_contacter?: Record<string, any>;
  ville?: VilleResource;
  adresse?: string;
  attributions?: AttributionResource[];
};

export type PersonneSansFonctionResource = {
  id: string;
  nom: string;
  code: string;
  prenom: string;
  type: string;
};

export type NiveauFormationResource = {
  id: string;
  nom: string;
};

export type FonctionResource = {
  id: string;
  nom: string;
  duree_mandat: string;
  nature: NatureResource;
};

export type AttributionResource = {
  id: string;
  personne: PersonneResource;
  organisation: OrganisationResource;
  fonction: FonctionResource;
  date_debut: string;
  date_fin?: string;
};

export type OrganisationPersonne = {
  nom: string;
  prenom: string;
  id: string;
  photo?: string;
};
export type OrganisationFonction = { nom: string; id: string };

export type OrganisationAttribution = {
  id?: string;
  personne?: OrganisationPersonne;
  fonction: OrganisationFonction;
  date_debut?: string;
  date_fin?: string;
};

export type GenreResource = {
  id: string;
  nom: string;
};
