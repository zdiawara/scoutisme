import { RoleResource } from "types/auth.type";
import * as yup from "yup";

export const roleSchema = yup.object({
  nom: yup.string().required(),
});

const toBody = (data: Record<string, any>) => {
  return {
    nom: data.nom,
    perimetres: data.perimetres,
  };
};
const toInput = (data: RoleResource) => {
  return {
    nom: data.nom,
    perimetres: data.perimetres,
  };
};
export const roleConverter = {
  toBody,
  toInput,
};
