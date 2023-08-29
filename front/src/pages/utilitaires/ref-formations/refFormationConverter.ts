import { RefFormationResource } from "types/organisation.type";
import { selectHelper } from "utils/functions";

const toBody = (data: Record<string, any>) => {
  return {
    nature_id: selectHelper.getValue(data.nature),
    nom: data.nom,
    duree_mandat: data.duree_mandat,
  };
};
const toInput = (data: RefFormationResource) => {
  return {
    id: data.id,
    nom: data.nom,
  };
};
export const refFormationConverter = {
  toBody,
  toInput,
};
