import { FC, useEffect } from "react";
import { PersonneForm, personneConverter } from "./form";
import { personneApi } from "api";
import { useSearchParams } from "react-router-dom";
import { TYPE_PERSONNES } from "utils/constants";

const CreatePersonne: FC = () => {
  let [searchParams] = useSearchParams();
  const typePersonne = searchParams.get("type");

  useEffect(() => {
    const typePersonneExist = [
      TYPE_PERSONNES.ADULTE,
      TYPE_PERSONNES.SCOUT,
    ].includes(typePersonne || "");

    if (!typePersonneExist) {
      // TODO exeption
    }
  }, [typePersonne]);

  const create = (input: any) => {
    return personneApi.create(personneConverter.toBody(input));
  };

  return (
    <PersonneForm
      onSave={create}
      title={`Ajouter ${
        typePersonne === TYPE_PERSONNES.SCOUT ? " un scout" : " un adulte"
      }`}
      defaultValues={{
        type: { value: typePersonne },
        attributionForm: "1",
      }}
    />
  );
};

export default CreatePersonne;
