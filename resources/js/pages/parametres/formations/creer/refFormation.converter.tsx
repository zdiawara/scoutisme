import { SelectItem } from "types/form.type";
import { RefFormationResource } from "types/organisation.type";
import { selectHelper } from "utils/functions";

const toBody = (data: Record<string, SelectItem | string>) => {
  return {
    nature_id: selectHelper.getValue(data.nature as SelectItem),
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
