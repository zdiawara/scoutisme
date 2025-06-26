import { UserResource } from "types/auth.type";
import { SelectItem } from "types/form.type";
import { selectHelper } from "utils/functions";
import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  role: yup.object().required().nullable(),
});

const toBody = (data: Record<string, string | SelectItem>) => {
  return {
    name: data.name,
    email: data.email,
    role_id: selectHelper.getValue(data.role as SelectItem),
  };
};
const toInput = (data: UserResource) => {
  return {
    name: data.name,
    email: data.email,
    role: { label: data.role.nom, value: data.role.id },
  };
};
export const utilisateurConverter = {
  toBody,
  toInput,
};
