import {
  SelectEtat,
  SelectFonction,
  SelectOrganisation,
  SelectRefFormation,
  SelectTypePersonne,
  SelectVille,
} from "components";
import { withFilterForm } from "hoc";
import { FC } from "react";
import { Col } from "react-bootstrap";

const FilterPersonneForm: FC = () => {
  return (
    <>
      <Col xs={6}>
        <SelectTypePersonne name="type" label="Type personne" isClearable />
      </Col>

      <Col xs={6}>
        <SelectEtat name="etat" label="Etat" isClearable />
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
    </>
  );
};

export const FilterPersonne = withFilterForm(FilterPersonneForm);
