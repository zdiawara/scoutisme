import { FC } from "react";
import { PersonneForm, personneConverter } from "./form";
import { personneApi } from "api";

const CreatePersonne: FC = () => {
  const create = (input: any) => {
    return personneApi.create(personneConverter.toBody(input));
  };
  return (
    <PersonneForm
      onSave={create}
      title="Ajouter une personne"
      defaultValues={{ type: { value: "adulte" } }}
    />
  );
};

export default CreatePersonne;
