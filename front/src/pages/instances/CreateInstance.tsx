import { FC } from "react";
import { InstanceForm } from "./form";
import { instanceConverter } from "./form/instanceUtils";

const CreateInstance: FC = () => {
  const create = (input: any) => {
    console.log(instanceConverter.toBody(input));
    return Promise.resolve();
  };
  return (
    <InstanceForm
      onSave={create}
      title="Créer une instance"
      defaultValues={{
        composition: [{ fonctions: null, quota: "" }],
      }}
    />
  );
};

export default CreateInstance;
