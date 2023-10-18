import { selectHelper } from "utils/functions";
import * as yup from "yup";

export const instanceSchema = yup.object({
  nom: yup.string().required().nullable(),
  composition: yup.array().of(
    yup.object().shape({
      fonction: yup.object().required().nullable(),
      quota: yup.number().required(),
    })
  ),
});

const toBody = (data: Record<string, any>) => {
  return {
    nom: data.nom,
    composition: data.composition.map((item: any) => ({
      fonctionId: selectHelper.getValue(item.fonction),
      quota: item.quota,
    })),
  };
};

const toInput = (data: any) => {
  return {};
};
export const instanceConverter = {
  toBody,
  toInput,
};
