export type PersonneResource = {
  id: string;
  nom: string;
  code: string;
  prenom: string;
  type: string;
  date_naissance: string;
  date_adhesion: string;
  email: string;
  fonction: string;
  etat: number;
  photo?: string;
};
