import * as yup from "yup";

export const personneSchema = yup.object({
  nom: yup.string().required(),
  ville: yup.object().required(),
});
