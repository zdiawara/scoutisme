import { SelectItem } from "types/form.type";
import { NatureResource } from "types/organisation.type";
import { FonctionResource } from "types/personne.type";
import { NATURE } from "utils/constants";
import { selectHelper } from "utils/functions";
import * as yup from "yup";

export const fonctionSchema = yup.object({
  nom: yup.string().required(),
  nature: yup.object().required(),
  duree_mandat: yup.string().required().nullable(),
  type: yup
    .object()
    .when(["nature"], {
      is: (nature: SelectItem & { item: NatureResource }) => {
        return !!nature?.item?.code && [NATURE.national].includes(nature.item.code);
      },
      then: () => yup.object().required(),
    })
    .nullable(),
});

const toBody = (data: Record<string, SelectItem | number>) => {
  return {
    nature_id: selectHelper.getValue(data.nature as SelectItem),
    type_id: selectHelper.getValue(data.type as SelectItem),
    nom: data.nom,
    duree_mandat: data.duree_mandat,
  };
};
const toInput = (data: FonctionResource) => {
  const { nature, type } = data;
  return {
    id: data.id,
    nom: data.nom,
    nature: { label: nature.nom, value: nature.id, item: nature },
    type: type ? { label: type.nom, value: type.id } : null,
    duree_mandat: data.duree_mandat || "",
  };
};
export const fonctionConverter = {
  toBody,
  toInput,
};
