import { villeApi } from "api";
import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { VilleResource } from "types/organisation.type";

export const SelectVille: FC<SelectProps> = (props) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await villeApi.findAll<VilleResource>();
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};
