import { refFormationApi } from "api";
import { FetchSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { RefFormationResource } from "types/organisation.type";

export const SelectRefFormation: FC<SelectProps> = (props) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await refFormationApi.findAll<RefFormationResource>();
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};
