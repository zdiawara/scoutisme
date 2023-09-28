import { organisationApi } from "api";
import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { OrganisationResource } from "types/organisation.type";

export const SelectOrganisation: FC<SelectProps> = ({
  requestParams,
  ...props
}) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await organisationApi.findAll<OrganisationResource>(
          requestParams
        );
        return data.map((item) => ({ label: item.nom, value: item.id, item }));
      }}
    />
  );
};
