import { FC } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { DatePicker, SelectGenre, TextInput } from "components";
import { PersonneResource } from "types/personne.type";
import { withForm, WrapperProps } from "hoc";
import { personneConverter } from "pages/personnes/form";
import { personneApi } from "api";
import { personneIdentiteSchema } from "pages/personnes/form/personneSchema";

const FormContainer: FC<WrapperProps> = ({ renderButtonsActions }) => {
  return (
    <>
      <Row className="g-3">
        <Col xs={6} sm={6}>
          <TextInput
            name="nom"
            label="Nom"
            placeholder="Ex. Ouattara"
            isRequired
          />
        </Col>
        <Col xs={6} sm={6}>
          <TextInput
            name="prenom"
            label="Prenom"
            placeholder="Ex. Moussa"
            isRequired
          />
        </Col>
        <Col xs={6} sm={6}>
          <SelectGenre name="genre" label="Genre" isRequired />
        </Col>
        <Col xs={6} sm={6}>
          <TextInput
            name="profession"
            label="Profession"
            placeholder="Profession"
          />
        </Col>
        <Col xs={6} sm={6}>
          <DatePicker
            name="date_naissance"
            label="Date naissance"
            useHookForm
            maxDate={new Date()}
            isClearable
          />
        </Col>

        <Col xs={6} sm={6}>
          <TextInput
            name="lieu_naissance"
            label="Lieu naissance"
            placeholder="Ex. Bobo Dioulasso"
          />
        </Col>
      </Row>

      {renderButtonsActions()}
    </>
  );
};

const PersonneIdentiteForm = withForm(FormContainer, personneIdentiteSchema);

type PersonneIdentiteEditProps = {
  personne: PersonneResource;
  onClose: () => void;
};

export const PersonneIdentiteEdit: FC<PersonneIdentiteEditProps> = ({
  personne,
  onClose,
}) => {
  const update = (input: any) => {
    return personneApi.update(
      personne.id,
      personneConverter.toIdentiteBody(input)
    );
  };

  return (
    <>
      <ListGroup.Item>
        <PersonneIdentiteForm
          onSave={update}
          defaultValues={personneConverter.toInput(personne)}
          goBack={onClose}
        />
      </ListGroup.Item>
    </>
  );
};
