import * as yup from "yup";

export const fonctionSchema = yup.object({
  nom: yup.string().required(),
  nature: yup.object().required(),
});
