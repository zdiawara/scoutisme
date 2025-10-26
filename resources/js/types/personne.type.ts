import { UserResource } from "./auth.type";
import { SelectItem } from "./form.type";
import { NatureResource, OrganisationResource, TypeOrganisationResource, VilleResource } from "./organisation.type";

export type FormationResource = {
  reference: NiveauFormationResource;
  date_formation: string;
};

export enum TypePersonne {
  adulte = "adulte",
  scout = "scout",
}

export type AuthPersonne = {
  code: string;
  email: string;
};

export type PersonneResource = {
  id: string;
  nom: string;
  code: string;
  prenom: string;
  type: TypePersonne;
  date_naissance?: string;
  lieu_naissance?: string;
  date_adhesion: string;
  profession?: string;
  genre?: GenreResource;
  formations?: FormationResource[];
  email: string;
  telephone?: string;
  etat: string;
  photo?: string;
  personne_a_contacter?: Record<string, any>;
  ville?: VilleResource;
  adresse?: string;
  attributions?: AttributionResource[];
  organisation?: OrganisationResource;
  fonction?: FonctionResource;
  date_debut?: string;
  date_fin?: string;
  etatCotisation: string;
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
  code: string;
  duree_mandat: string;
  responsable: string;
  nature: NatureResource;
  type?: TypeOrganisationResource;
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
  code: string;
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

export type CotisationResource = {
  id: string;
  annee: number;
  montant_total: number;
  montant_restant: number;
  montant_paye: number;
  etat: string;
  personne?: PersonneResource;
  paiements: PaiementResource[];
};

export type PaiementResource = {
  id: string;
  numero: string;
  etat: string;
  montant: number;
  cotisation: CotisationResource;
  valideur?: UserResource;
  createur: UserResource;
  created_at: string;
  commentaire?: string;
  date_traitement?: string;
};

export type PersonneCarteRecto = {
  type: string;
  meta: {
    association: string;
    signataire: {
      libelle: string;
      nom: string;
    };
  };
  personne: {
    nom: string;
    code: string;
    fonction: string;
  };
  lignes: Array<{ nom: string; value: string }>;
  validite: {
    debut: string;
    fin: string;
  };
};

export type PersonneCarteVerso = {
  nom: string;
  adrese: { label: string; value: string };
  telephone: { label: string; value: string };
  recepisse: { label: string; numero: string; date: string };
  personne_a_contacter: {
    nom: string;
    telephone: string;
  };
};
export type PersonneCarte = {
  recto: PersonneCarteRecto;
  verso: PersonneCarteVerso;
};

export type PersonneAContacterInput = {
  personne_a_contacter?: {
    nom: string;
    relation: string;
    telephone: string;
  };
};

export type IdentiteInput = {
  nom: string;
  prenom: string;
  genre: string;
  profession?: string | null;
  lieu_naissance?: string | null;
  date_naissance?: Date | null;
};

export type CoordonneeInput = {
  telephone?: string | null;
  email?: string | null;
  ville?: SelectItem | null;
  adresse?: string | null;
};

export type PersonneInput = {
  identite: IdentiteInput;
  coordonnee: CoordonneeInput;
  personneAContacter: PersonneAContacterInput;
};

export type PersonneDebutFonctionInput = {
  date_debut: Date | null;
};
