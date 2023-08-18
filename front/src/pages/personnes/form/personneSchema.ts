import * as yup from "yup";

import { differenceInYears } from "date-fns";

export const personneSchema = yup.object({
  type: yup.object().required().nullable(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  lieu_naissance: yup.string().required(),
  date_naissance: yup
    .date()
    // .test("date_naissance", "Doit avoir au moins 7 ans", (value) => {
    //   return !value ? true : differenceInYears(new Date(), value) >= 7;
    // })
    .required()
    .nullable(),
  email: yup.string().email().nullable(),
  ville: yup.object().required().nullable(),
  niveau_formation: yup
    .string()
    .when(["type"], {
      is: (type: any) => type?.value === "adulte",
      then: () => {
        return yup.object().required().nullable();
      },
    })
    .nullable(),
});
