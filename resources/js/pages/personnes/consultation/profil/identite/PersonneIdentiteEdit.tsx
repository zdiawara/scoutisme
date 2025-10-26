import { FC } from "react";
import { ListGroup, Row } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { withForm, WrapperProps } from "hoc";
import { personneConverter, PersonneIdentiteForm } from "pages/personnes/form";
import { personneApi } from "api";
import { personneIdentiteSchema } from "pages/personnes/form/personneSchema";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";

const FormContainer: FC<WrapperProps> = ({ renderButtonsActions }) => {
  return (
    <>
      <Row className="g-3">
        <PersonneIdentiteForm />
      </Row>
      {renderButtonsActions()}
    </>
  );
};

const Form = withForm(FormContainer, personneIdentiteSchema);

type PersonneIdentiteEditProps = {
  personne: PersonneResource;
  onClose: () => void;
};

export const PersonneIdentiteEdit: FC<PersonneIdentiteEditProps> = ({ personne, onClose }) => {
  const clientQuery = useQueryClient();

  const update = (input: Record<string, string>) => {
    return personneApi.update(personne.id, personneConverter.toIdentiteBody(input)).then((response) => {
      clientQuery.invalidateQueries([QUERY_KEY.personnes]);
      return response;
    });
  };

  return (
    <ListGroup.Item>
      <Form onSave={update} defaultValues={personneConverter.toInput(personne)} goBack={onClose} />
    </ListGroup.Item>
  );
};
