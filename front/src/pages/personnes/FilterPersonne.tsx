import {
  Radio,
  SelectFonction,
  SelectGenre,
  SelectOrganisation,
  SelectRefFormation,
  SelectVille,
} from "components";
import { withFilterForm } from "hoc";
import { FC } from "react";
import { Col } from "react-bootstrap";

const FilterPersonneForm: FC = () => {
  return (
    <>
      <Col xs={6}>
        <SelectGenre name="genre" label="Genre" isClearable />
      </Col>
      <Col xs={12}>
        <SelectFonction name="fonction" label="Fonction" isClearable />
      </Col>

      <Col xs={12}>
        <SelectOrganisation
          name="organisation"
          label="Organisation"
          isClearable
        />
      </Col>

      <Col>
        <Radio
          name="inclureSousOrganisation"
          label="Inclure les sous organisations"
          type="switch"
          inline
          value="true"
        />
      </Col>

      <Col xs={12}>
        <SelectRefFormation
          name="niveauFormation"
          label="Niveau formation"
          isClearable
        />
      </Col>

      <Col xs={12}>
        <SelectVille name="ville" label="Ville de résidence" isClearable />
      </Col>
    </>
  );
};

export const FilterPersonne = withFilterForm(FilterPersonneForm);
