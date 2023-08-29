import * as yup from "yup";

export const personneSchema = yup.object({
  type: yup.object().required().nullable(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  email: yup.string().email().nullable(),
  /*   niveau_formation: yup
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
