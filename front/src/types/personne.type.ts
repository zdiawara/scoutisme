import { VilleResource } from "./organisation.type";

export type PersonneResource = {
  id: string;
  nom: string;
  code: string;
  prenom: string;
  type: string;
  date_naissance: string;
  lieu_naissance: string;
  date_adhesion: string;
  profession?: string;
  niveau_formation?: NiveauFormationResource;
  email: string;
  telephone?: string;
  fonction: string;
  etat: string;
  photo?: string;
  personne_a_contacter?: Record<string, any>;
  ville?: VilleResource;
  adresse?: string;
};

export type NiveauFormationResource = {
  id: string;
  nom: string;
};
