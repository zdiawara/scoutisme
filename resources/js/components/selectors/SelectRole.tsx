import { roleApi } from "api";
import { FetchSelect } from "components/forms/Select";
import { FC } from "react";
import { RoleResource } from "types/auth.type";
import { SelectProps } from "types/form.type";

export const SelectRole: FC<SelectProps> = (props) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await roleApi.findAll<RoleResource>();
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};
