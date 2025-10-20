import { organisationApi } from "api";
import { FetchSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { OrganisationResource } from "types/organisation.type";

export const SelectOrganisation: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await organisationApi.findAll<OrganisationResource>(requestParams);
        return data.map((item) => ({
          label: item.nom,
          value: item.id,
          item,
          subtitle: item.nature.nom,
        }));
      }}
    />
  );
};
