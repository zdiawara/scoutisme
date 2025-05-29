import { roleApi } from "api";
import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { RoleResource } from "types/auth.type";
import { SelectProps } from "types/form.type";

export const SelectRole: FC<SelectProps> = (props) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await roleApi.findAll<RoleResource>();
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};
