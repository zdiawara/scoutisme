import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { withForm, WrapperProps } from "hoc";
import { PersonneAContacterForm, personneConverter } from "pages/personnes/form";
import { personneApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";

const FormContainer: FC<WrapperProps> = ({ renderButtonsActions }) => {
  return (
    <>
      <PersonneAContacterForm />
      {renderButtonsActions()}
    </>
  );
};

const Form = withForm(FormContainer);

type EditPersonneAContacterProps = {
  personne: PersonneResource;
  onClose: () => void;
};

export const EditPersonneAContacter: FC<EditPersonneAContacterProps> = ({ personne, onClose }) => {
  const clientQuery = useQueryClient();

  const update = async (input: Record<string, string>) => {
    const response = await personneApi.update(personne.id, personneConverter.toPersonneAContacterBody(input));
    clientQuery.invalidateQueries([QUERY_KEY.personnes]);
    return response;
  };

  return (
    <ListGroup.Item>
      <Form onSave={update} defaultValues={personneConverter.toInput(personne)} goBack={onClose} />
    </ListGroup.Item>
  );
};
