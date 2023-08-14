import { selectHelper } from "utils/functions";

const toBody = (data: Record<string, any>) => {
  return {
    nature_id: selectHelper.getValue(data.nature),
    nom: data.nom,
    type_id: selectHelper.getValue(data.type),
    parent_id: selectHelper.getValue(data.parent),
    ville_id: selectHelper.getValue(data.ville),
    adresse: data.adresse,
  };
};
export const organisationConverter = {
  toBody,
};
