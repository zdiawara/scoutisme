import { FC } from "react";
import { OrganisationForm, organisationConverter } from "./form";
import { organisationApi } from "api";
import { useLoaderData } from "react-router-dom";
import { OrganisationResource } from "types/organisation.type";

const EditOrganisation: FC = () => {
  const organisation = useLoaderData() as OrganisationResource;

  const update = (input: any) => {
    return organisationApi.update(
      organisation.id,
      organisationConverter.toBody(input)
    );
  };

  return (
    <OrganisationForm
      onSave={update}
      defaultValues={organisationConverter.toInput(organisation)}
      title={organisation.nom}
      subtitle="Modification"
    />
  );
};

export default EditOrganisation;
