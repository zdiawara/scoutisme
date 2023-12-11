import { UserResource } from "types/auth.type";
import { selectHelper } from "utils/functions";
import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  role: yup.object().required().nullable(),
});

const toBody = (data: Record<string, any>) => {
  return {
    name: data.name,
    email: data.email,
    role_id: selectHelper.getValue(data.role),
  };
};
const toInput = (data: UserResource) => {
  return {
    name: data.name,
    email: data.email,
    role: { label: data.role.nom, value: data.role.id },
  };
};
export const userConverter = {
  toBody,
  toInput,
};
