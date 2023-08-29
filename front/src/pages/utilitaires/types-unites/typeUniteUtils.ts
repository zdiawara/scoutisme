import { TypeOrganisationResource } from "types/organisation.type";
import * as yup from "yup";

const toBody = (data: Record<string, any>) => {
  return {
    nom: data.nom,
  };
};
const toInput = (data: TypeOrganisationResource) => {
  return {
    id: data.id,
    nom: data.nom,
  };
};

export const typeUniteConverter = {
  toBody,
  toInput,
};

export const typeUniteSchema = yup.object({
  nom: yup.string().required(),
});
