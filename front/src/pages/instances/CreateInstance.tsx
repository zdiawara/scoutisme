import { FC } from "react";
import { InstanceForm } from "./form";

const CreateInstance: FC = () => {
  const create = (input: any) => {
    return Promise.resolve();
  };
  return (
    <InstanceForm
      onSave={create}
      title="Créer une instance"
      defaultValues={{
        critere: {
          mode: "all",
        },
      }}
    />
  );
};

export default CreateInstance;
