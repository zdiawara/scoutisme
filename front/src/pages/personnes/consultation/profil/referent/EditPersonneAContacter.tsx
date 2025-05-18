import { FC } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { TextInput } from "components";
import { PersonneResource } from "types/personne.type";
import { withForm, WrapperProps } from "hoc";
import { personneConverter } from "pages/personnes/form";
import { personneApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { MASK, QUERY_KEY } from "utils/constants";

const FormContainer: FC<WrapperProps> = ({ renderButtonsActions }) => {
  return (
    <>
      <Row className="g-3">
        <Col xs={6}>
          <TextInput
            name="personne_a_contacter.nom"
            label="Nom et Prenom"
            placeholder="Ex: Ouattara Alassane"
          />
        </Col>
        <Col xs={6}>
          <TextInput
            name="personne_a_contacter.relation"
            label="Relation"
            placeholder="Ex: Père"
          />
        </Col>
        <Col xs={12}>
          <TextInput
            name="personne_a_contacter.telephone"
            label="Num. tel"
            placeholder="00 00 00 00"
            mask={MASK.telephone}
          />
        </Col>
      </Row>

      {renderButtonsActions()}
    </>
  );
};

const Form = withForm(FormContainer);

type EditPersonneAContacterProps = {
  personne: PersonneResource;
  onClose: () => void;
};

export const EditPersonneAContacter: FC<EditPersonneAContacterProps> = ({
  personne,
  onClose,
}) => {
  const clientQuery = useQueryClient();

  const update = async (input: any) => {
    const response = await personneApi.update(
      personne.id,
      personneConverter.toPersonneAContacterBody(input)
    );
    clientQuery.invalidateQueries([QUERY_KEY.personnes]);
    return response;
  };

  return (
    <ListGroup.Item>
      <Form
        onSave={update}
        defaultValues={personneConverter.toInput(personne)}
        goBack={onClose}
      />
    </ListGroup.Item>
  );
};
