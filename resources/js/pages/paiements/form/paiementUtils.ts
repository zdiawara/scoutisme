import * as yup from "yup";

export const paiementSchema = yup.object({
  montant: yup.string().required().nullable(),
});
