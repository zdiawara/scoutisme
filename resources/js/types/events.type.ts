import { SelectItem } from "./form.type";

type InstanceFonction = {
  fonction: SelectItem;
  quota: number;
  commentaire: string;
};
export type InstanceResource = {
  id: string;
  nom: string;
  code: string;
  compositions?: Array<InstanceFonction>;
};
