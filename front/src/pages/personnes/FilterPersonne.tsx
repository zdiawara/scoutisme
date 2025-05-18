import {
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
      <Col xs={12}>
        <SelectGenre name="genre" label="Genre" isClearable placeholder="" />
      </Col>
      <Col xs={12}>
        <SelectFonction
          name="fonction"
          label="Fonction"
          isClearable
          placeholder=""
        />
      </Col>

      <Col xs={12}>
        <SelectOrganisation
          name="organisation"
          label="Organisation"
          isClearable
          placeholder=""
        />
      </Col>

      <Col xs={12}>
        <SelectRefFormation
          name="niveauFormation"
          label="Niveau formation"
          isClearable
          placeholder=""
        />
      </Col>

      <Col xs={12}>
        <SelectVille
          name="ville"
          label="Ville de residence"
          isClearable
          placeholder=""
        />
      </Col>
    </>
  );
};

export const FilterPersonne = withFilterForm(FilterPersonneForm);
