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
        role_id: selectHelper.getValue(data.critere.profil.role),
        organisation_id: selectHelper.getValue(
          data.critere.profil.organisation
        ),
        nature_id: selectHelper.getValue(data.critere.profil.nature),
      };
      break;
    case "personne":
      critere.value = {
        type: selectHelper.getValue(data.critere.personne.type),
      };
      break;
    default:
      break;
  }
  return {
    titre: data.titre,
    content: data.content,
    critere,
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
