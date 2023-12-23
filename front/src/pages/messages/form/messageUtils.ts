import { selectHelper } from "utils/functions";
import * as yup from "yup";

export const messageSchema = yup.object({
  objet: yup.string().required().nullable(),
  contenu: yup.string().required().nullable(),
});

const toBody = (data: Record<string, any>) => {
  const critere: Record<string, any> = {
    value: {},
  };
  critere.mode = data.critere.mode;
  switch (critere.mode) {
    case "profil":
      critere.value = {
        fonction_id: selectHelper.getValue(data.critere.value.fonction),
        organisation_id: selectHelper.getValue(data.critere.value.organisation),
        nature_id: selectHelper.getValue(data.critere.value.nature),
      };
      break;
    case "personne":
      critere.value = {
        type: selectHelper.getValue(data.critere.value.type),
      };
      break;
    default:
      break;
  }
  return {
    objet: data.objet,
    contenu: data.contenu,
    critere: {
      ...critere,
      value: Object.entries(critere.value)
        .filter((e) => !!e[1])
        .reduce((prev, curr) => {
          prev[curr[0]] = curr[1];
          return prev;
        }, {} as any),
    },
  };
};

export const messageConverter = {
  toBody,
};
