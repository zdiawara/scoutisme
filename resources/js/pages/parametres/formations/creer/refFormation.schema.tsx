import * as yup from "yup";

export const refFormationSchema = yup.object({
  nom: yup.string().required(),
});
