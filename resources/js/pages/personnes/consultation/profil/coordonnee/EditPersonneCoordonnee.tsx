import { FC } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { SelectVille, TextInput } from "components";
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
        <Col xs={12}>
          <TextInput
            name="telephone"
            label="Num. Tel"
            placeholder="00 00 00 00"
            mask={MASK.telephone}
          />
        </Col>

        <Col xs={12}>
          <TextInput name="email" label="Email" placeholder="Adresse email" />
        </Col>

        <Col sm={6}>
          <SelectVille
            name="ville"
            label="Ville de residence"
            placeholder="Choisir"
            isClearable
          />
        </Col>

        <Col sm={6}>
          <TextInput
            name="adresse"
            label="Lieu de residence"
            placeholder="Quartier"
          />
        </Col>
      </Row>

      {renderButtonsActions()}
    </>
  );
};

const Form = withForm(FormContainer);

type PersonneIdentiteEditProps = {
  personne: PersonneResource;
  onClose: () => void;
};

export const EditPersonneCoordonnee: FC<PersonneIdentiteEditProps> = ({
  personne,
  onClose,
}) => {
  const clientQuery = useQueryClient();

  const update = async (input: any) => {
    const response = await personneApi.update(
      personne.id,
      personneConverter.toCoordonneeBody(input)
    );
    clientQuery.invalidateQueries([QUERY_KEY.personnes]);
    return response;
  };

  return (
    <>
      <ListGroup.Item>
        <Form
          onSave={update}
          defaultValues={personneConverter.toInput(personne)}
          goBack={onClose}
        />
      </ListGroup.Item>
    </>
  );
};
