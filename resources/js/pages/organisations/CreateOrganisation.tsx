import { FC } from "react";
import { OrganisationForm, organisationConverter } from "./form";
import { organisationApi } from "api";

const CreateOrganisation: FC = () => {
  const create = (input: any) => {
    return organisationApi.create(organisationConverter.toBody(input));
  };
  return <OrganisationForm onSave={create} title="Créer une organisation" />;
};

export default CreateOrganisation;
