import {
  SelectEtatPaiement,
  SelectFonction,
  SelectOrganisation,
} from "components";
import { withFilterForm } from "hoc";
import { FC } from "react";
import { Col } from "react-bootstrap";

const FilterPaiementForm: FC = () => {
  return (
    <>
      <Col xs={12}>
        <SelectEtatPaiement name="etat" label="Etat paiement" isClearable />
      </Col>
      <Col xs={12}>
        <SelectOrganisation
          name="organisation"
          label="Organisation"
          isClearable
        />
      </Col>
      <Col xs={12}>
        <SelectFonction name="fonction" label="Fonction" isClearable />
      </Col>
    </>
  );
};

export const FilterPaiement = withFilterForm(FilterPaiementForm);
