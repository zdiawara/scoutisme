import * as yup from "yup";

export const organisationMembreSchema = yup.object({
  personne: yup.object().required(),
  fonction: yup.object().required(),
  date_debut: yup.date().required().nullable(),
});
