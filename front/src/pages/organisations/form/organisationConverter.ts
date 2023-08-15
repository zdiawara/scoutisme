import { OrganisationResource } from "types/organisation.type";
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
const toInput = (data: OrganisationResource) => {
  const { parent, nature, type, ville } = data;
  return {
    id: data.id,
    nom: data.nom,
    nature: { label: nature.nom, value: nature.id, item: nature },
    type: type ? { label: type.nom, value: type.id } : null,
    parent: parent ? { label: parent.nom, value: parent.id } : null,
    adresse: data.adresse,
    ville: { label: ville.nom, value: ville.id },
  };
};
export const organisationConverter = {
  toBody,
  toInput,
};
