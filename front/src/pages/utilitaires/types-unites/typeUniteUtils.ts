import { TypeOrganisationResource } from "types/organisation.type";
import * as yup from "yup";

const toBody = (data: Record<string, any>) => {
  return {
    nom: data.nom,
    position: data.position,
    membre: data.membre,
  };
};
const toInput = (data: TypeOrganisationResource) => {
  return {
    id: data.id,
    nom: data.nom,
    position: data.position,
    membre: data.membre,
  };
};

export const typeUniteConverter = {
  toBody,
  toInput,
};

export const typeUniteSchema = yup.object({
  nom: yup.string().required(),
  position: yup.number().required(),
  membre: yup.string().required(),
});
