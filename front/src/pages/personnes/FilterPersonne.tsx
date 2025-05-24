import {
  SelectFonction,
  SelectGenre,
  SelectOrganisation,
  SelectRefFormation,
  SelectVille,
} from "components";
import { withFilterForm } from "hoc";
import { useAuth } from "hooks";
import { FC } from "react";
import { Col } from "react-bootstrap";

const FilterPersonneForm: FC = () => {
  const { userDroit, user } = useAuth();

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
          requestParams={{
            codeNature: userDroit?.perimetres?.join(";"),
          }}
        />
      </Col>

      {!userDroit?.hasOnlyPerimetreUnite() && (
        <Col xs={12}>
          <SelectOrganisation
            name="organisation"
            label="Organisation"
            isClearable
            placeholder=""
            requestParams={{
              perimetres: userDroit?.perimetres?.join(";"),
              organisationId: user?.personne?.organisation?.id,
            }}
          />
        </Col>
      )}

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
