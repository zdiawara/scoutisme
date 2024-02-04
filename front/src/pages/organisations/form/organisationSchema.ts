import { NATURE } from "utils/constants";
import * as yup from "yup";

export const organisationSchema = yup.object({
  nom: yup.string().required(),
  code: yup.string().length(4).required(),
  nature: yup.object().required(),
  parent: yup
    .object()
    .when(["nature"], {
      is: (nature: any) => {
        return (
          !!nature?.item?.code &&
          [NATURE.unite, NATURE.groupe, NATURE.region].includes(
            nature.item.code
          )
        );
      },
      then: () => {
        return yup.object().required();
      },
    })
    .nullable(),

  type: yup
    .object()
    .when(["nature"], {
      is: (nature: any) => {
        return (
          !!nature?.item?.code &&
          [NATURE.unite, NATURE.national].includes(nature.item.code)
        );
      },
      then: () => {
        return yup.object().required();
      },
    })
    .nullable(),
});

export const organisationMembreSchema = yup.object({
  personne: yup.object().required(),
  fonction: yup.object().required(),
  date_debut: yup.date().required().nullable(),
});
