import * as yup from "yup";

export const instanceSchema = yup.object({
  nom: yup.string().required().nullable(),
  compositions: yup.array().of(
    yup.object().shape({
      fonction: yup.object().required().nullable(),
      quota: yup.number().required(),
    })
  ),
});

const toBody = (data: Record<string, any>) => {
  return {
    nom: data.nom,
    compositions: data.compositions.map((item: any) => ({
      fonction: item.fonction,
      quota: item.quota,
      commentaire: item.commentaire,
    })),
  };
};

const toInput = (data: any) => {
  return {
    nom: data.nom,
    compositions: data.compositions.map((item: any) => ({
      fonction: item.fonction,
      quota: item.quota,
      commentaire: item.commentaire,
    })),
  };
};
export const instanceConverter = {
  toBody,
  toInput,
};
