import { FC } from "react";
import { OrganisationForm, organisationConverter } from "./form";
import { LINKS } from "utils";
import { organisationApi } from "api";
import { useNavigate } from "react-router-dom";

const CreateOrganisation: FC = () => {
  const navigation = useNavigate();
  const create = (input: any) => {
    return organisationApi.create(organisationConverter.toBody(input));
  };
  return (
    <>
      <OrganisationForm
        backUrl={LINKS.organisations.base}
        onSave={create}
        onFinished={(e) => navigation(LINKS.organisations.base)}
        //defaultValues={{}}
      />
    </>
  );
};

export default CreateOrganisation;
