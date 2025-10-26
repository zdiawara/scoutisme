import { FC } from "react";
import { Col } from "react-bootstrap";
import { SelectVille, TextInput } from "components";
import { MASK } from "utils/constants";

export const PersonneCoordonneForm: FC = () => (
  <>
    <Col xs={12}>
      <TextInput name="telephone" label="Num. Tel" placeholder="00 00 00 00" mask={MASK.telephone} />
    </Col>

    <Col xs={12}>
      <TextInput name="email" label="Email" placeholder="Adresse email" />
    </Col>

    <Col sm={6}>
      <SelectVille name="ville" label="Ville de residence" placeholder="Choisir" isClearable />
    </Col>

    <Col sm={6}>
      <TextInput name="adresse" label="Lieu de residence" placeholder="Quartier" />
    </Col>
  </>
);
