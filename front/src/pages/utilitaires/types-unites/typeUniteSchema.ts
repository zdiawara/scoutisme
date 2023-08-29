import * as yup from "yup";

export const typeUniteSchema = yup.object({
  nom: yup.string().required(),
});
