import { FC } from "react";
import { MessageForm } from "./form";
import { messageApi } from "api";
import { messageConverter } from "./form/messageUtils";

const CreateMessage: FC = () => {
  const create = (input: any) => {
    console.log(input);
    return messageApi.create(messageConverter.toBody(input));
  };
  return (
    <MessageForm
      onSave={create}
      title="Envoyer un mail"
      defaultValues={{
        critere: {
          mode: "all",
        },
      }}
    />
  );
};

export default CreateMessage;
