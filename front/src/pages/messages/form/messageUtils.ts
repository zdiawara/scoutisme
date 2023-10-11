import { selectHelper } from "utils/functions";
import * as yup from "yup";

export const messageSchema = yup.object({
  titre: yup.string().required().nullable(),
  content: yup.string().required().nullable(),
});

const toBody = (data: Record<string, any>) => {
  const critere: Record<string, any> = {};
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
    titre: data.titre,
    content: data.content,
    critere: {
      ...critere,
      value: Object.entries(critere.value).filter((e) => !!e[1]),
    },
  };
};

const toInput = (data: any) => {
  const { nature } = data;
  return {
    id: data.id,
    nom: data.nom,
    nature: { label: nature.nom, value: nature.id },
    duree_mandat: data.duree_mandat,
  };
};
export const messageConverter = {
  toBody,
  toInput,
};
