import * as yup from "yup";

export const personneSchema = yup.object({
  type: yup.object().required().nullable(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  email: yup.string().email().nullable(),
  genre: yup.object().required().nullable(),
});

export const personneCoordonneSchema = yup.object({
  email: yup.string().email().nullable(),
});

export const personneIdentiteSchema = yup.object({
  nom: yup.string().required(),
  prenom: yup.string().required(),
  genre: yup.string().required(),
  profession: yup.string().nullable(),
  lieu_naissance: yup.string().nullable(),
  date_naissance: yup.date().nullable(),
});

export const personneFormationSchema = yup.object({
  niveau_formation: yup.object().required().nullable(),
});
