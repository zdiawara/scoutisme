import { FonctionResource } from "types/personne.type";
import { selectHelper } from "utils/functions";

const toBody = (data: Record<string, any>) => {
  return {
    nature_id: selectHelper.getValue(data.nature),
    nom: data.nom,
    duree_mandat: data.duree_mandat,
  };
};
const toInput = (data: FonctionResource) => {
  const { nature } = data;
  return {
    id: data.id,
    nom: data.nom,
    nature: { label: nature.nom, value: nature.id },
    duree_mandat: data.duree_mandat,
  };
};
export const fonctionConverter = {
  toBody,
  toInput,
};
