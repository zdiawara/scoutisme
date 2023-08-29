import { natureApi } from "api";
import { AsyncSelect, AsyncSelectSimple } from "components/forms/Select";
import { FC } from "react";
import { SelectItem, SelectProps } from "types/form.type";
import { NatureResource } from "types/organisation.type";

export const SelectNature: FC<SelectProps> = (props) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await natureApi.findAll<NatureResource>(
          props.requestParams
        );
        return data.map((item) => ({ label: item.nom, value: item.id, item }));
      }}
    />
  );
};

export const SelectNatureSimple: FC<
  SelectProps & {
    onChange: (value?: SelectItem) => void;
    value?: SelectItem;
  }
> = (props) => {
  return (
    <AsyncSelectSimple
      {...props}
      fetchOptions={async () => {
        const { data } = await natureApi.findAll<NatureResource>();
        return data.map((item) => ({ label: item.nom, value: item.id, item }));
      }}
    />
  );
};
