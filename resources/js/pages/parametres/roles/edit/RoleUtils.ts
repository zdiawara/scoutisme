import { RoleResource } from "types/auth.type";
import { SelectItem } from "types/form.type";
import * as yup from "yup";

export const roleSchema = yup.object({
  nom: yup.string().required(),
});

const toBody = (data: Record<string, string | SelectItem | SelectItem[]>) => {
  return {
    nom: data.nom,
    perimetres: [(data.perimetre as SelectItem & { item: { code: string } }).item.code],
    fonctions: (data.fonctions as SelectItem[]).map((e) => e.value),
  };
};

const toInput = (data: RoleResource) => {
  return {
    nom: data.nom,
    perimetre: {
      label: data.perimetre.nom,
      value: data.perimetre.id,
      item: data.perimetre,
    },
    fonctions: data.fonctions.map((fonction) => ({ label: fonction.nom, value: fonction.id })),
    fonctionnalites: data.habilitations.map(({ fonctionnalite }) => fonctionnalite.id),
  };
};

export const roleConverter = {
  toBody,
  toInput,
};
