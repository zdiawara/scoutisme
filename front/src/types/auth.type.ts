import { PersonneResource } from "./personne.type";

export type UserResource = {
  id: string;
  name: string;
  email: string;
  role: RoleResource;
  fonctionnalites: FonctionnaliteResource[];
  personne?: PersonneResource;
};

export type RoleResource = {
  id: string;
  nom: string;
  code: string;
  perimetres: string[];
  habilitations: HabilitationResource[];
};

export type FonctionnaliteResource = {
  id: string;
  nom: string;
  code: string;
  module: ModuleResource;
  description: string;
};

export type HabilitationResource = {
  id: string;
  fonctionnalite: FonctionnaliteResource;
  role: RoleResource;
};

export type ModuleResource = {
  id: string;
  nom: string;
  code: string;
  sous_modules: ModuleResource[];
  fonctionnalites: FonctionnaliteResource[];
  parent?: ModuleResource;
};
