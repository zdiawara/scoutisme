import { FC } from "react";
import { InstanceForm } from "./form";
import { instanceConverter } from "./instanceUtils";
import { instanceApi } from "api";

const CreateInstance: FC = () => {
  const create = (input: any) => {
    return instanceApi.create(instanceConverter.toBody(input));
  };
  return (
    <InstanceForm
      onSave={create}
      title="Créer une instance"
      defaultValues={{
        compositions: [{ fonctions: null, quota: "" }],
      }}
    />
  );
};

export default CreateInstance;
