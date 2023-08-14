import * as yup from "yup";

export const organisationSchema = yup.object({
  nom: yup.string().required(),
  nature: yup.object().required(),
  ville: yup.object().required(),
});
