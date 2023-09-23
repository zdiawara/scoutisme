import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";

export const SelectEtat: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        return [
          { label: "Actif", value: "true" },
          { label: "Inactif", value: "false" },
        ];
      }}
    />
  );
};
