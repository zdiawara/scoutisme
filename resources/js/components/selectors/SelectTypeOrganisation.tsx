import { typeOrganisationApi } from "api";
import { FetchSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { TypeOrganisationResource } from "types/organisation.type";

export const SelectTypeOrganisation: FC<SelectProps> = (props) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await typeOrganisationApi.findAll<TypeOrganisationResource>(props.requestParams);
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};
