import * as yup from "yup";

export const personneSchema = yup.object({
  type: yup.object().required().nullable(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  email: yup.string().email().nullable(),
   /* date_acquisition: yup.date().required().max(new Date(), 'La date ne peut pas être dans le futur'),
   niveau_formation: yup
    .object()
    .when(["type"], {
      is: (type: any) => type?.value === "adulte",
      then: () => {
        return yup.object().required().nullable();
      },
    })
    .nullable(), */
  genre: yup.object().required().nullable(),
});
