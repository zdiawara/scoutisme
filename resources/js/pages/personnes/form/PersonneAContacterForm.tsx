import { FC } from "react";
import { Col } from "react-bootstrap";
import { TextInput } from "components";
import { MASK } from "utils/constants";

export const PersonneAContacterForm: FC = () => {
  return (
    <>
      <Col xs={6}>
        <TextInput name="personne_a_contacter.nom" label="Nom et Prenom" placeholder="Ex: Ouattara Alassane" />
      </Col>
      <Col xs={6}>
        <TextInput name="personne_a_contacter.relation" label="Relation" placeholder="Ex: Père" />
      </Col>
      <Col xs={12}>
        <TextInput
          name="personne_a_contacter.telephone"
          label="Num. tel"
          placeholder="00 00 00 00"
          mask={MASK.telephone}
        />
      </Col>
    </>
  );
};
