export type MontantCotisationResource = {
  id: string;
  type: string;
  profil: string;
  montants: Array<{ value: string; id: string }>;
};
