import { RequestParam } from "./request.type";

export type SelectItem = {
  value: string;
  label: string;
};

export interface AsyncSelectProps extends SelectProps {
  fetchOptions: () => Promise<SelectItem[]>;
}

export type SelectProps = {
  label?: string;
  placeholder?: string;
  name: string;
  isRequired?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  initialOptions?: SelectItem[];
  afterSelected?: (value: SelectItem) => void;
  requestParams?: RequestParam;
  resetDeps?: string[];
  description?: string;
};

export type CrudAction<T> = {
  code: "c" | "u" | "d";
  element?: T;
};
