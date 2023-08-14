import { natureApi } from "api";
import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { NatureResource } from "types/organisation.type";

export const SelectNature: FC<SelectProps> = (props) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await natureApi.findAll<NatureResource>();
        return data.map((item) => ({ label: item.nom, value: item.id, item }));
      }}
    />
  );
};
