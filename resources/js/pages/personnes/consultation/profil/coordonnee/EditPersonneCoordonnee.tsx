import { FC } from "react";
import { ListGroup, Row } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { withForm, WrapperProps } from "hoc";
import { personneConverter, PersonneCoordonneForm } from "pages/personnes/form";
import { personneApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";

const FormContainer: FC<WrapperProps> = ({ renderButtonsActions }) => (
  <>
    <Row className="g-3">
      <PersonneCoordonneForm />
    </Row>
    {renderButtonsActions()}
  </>
);

const Form = withForm(FormContainer);

type Props = {
  personne: PersonneResource;
  onClose: () => void;
};

export const EditPersonneCoordonnee: FC<Props> = ({ personne, onClose }) => {
  const clientQuery = useQueryClient();

  const update = async (input: Record<string, string>) => {
    const response = await personneApi.update(personne.id, personneConverter.toCoordonneeBody(input));
    clientQuery.invalidateQueries([QUERY_KEY.personnes]);
    return response;
  };

  return (
    <ListGroup.Item>
      <Form onSave={update} defaultValues={personneConverter.toInput(personne)} goBack={onClose} />
    </ListGroup.Item>
  );
};
