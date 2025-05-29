import { FC } from "react";
import { PersonneForm, personneConverter } from "./form";
import { personneApi } from "api";
import { useLoaderData } from "react-router-dom";
import { PersonneResource } from "types/personne.type";

const EditPersonne: FC = () => {
  const personne = useLoaderData() as PersonneResource;

  const update = (input: any) => {
    return personneApi.update(personne.id, personneConverter.toBody(input));
  };

  return (
    <PersonneForm
      onSave={update}
      defaultValues={personneConverter.toInput(personne)}
      title={personne.nom}
      subtitle="Modification"
    />
  );
};

export default EditPersonne;
