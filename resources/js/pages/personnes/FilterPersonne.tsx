import {
  AsyncSelect,
  CheckBox,
  SelectFonction,
  SelectGenre,
  SelectOrganisation,
  SelectRefFormation,
  SelectVille,
  SwitchBox,
} from "components";
import { withFilterForm } from "hoc";
import { useAuth } from "hooks";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { buildPerimetres } from "utils/functions";

const FilterPersonneForm: FC = () => {
  const { userDroit, user } = useAuth();

  const codeNature = user?.personne?.organisation?.nature?.code;

  const perimetres = codeNature ? buildPerimetres(codeNature).join(";") : null;

  return (
    <>
      <Col xs={12}>
        <SelectGenre name="genre" label="Genre" isClearable placeholder="" />
      </Col>
      <Col>
        <AsyncSelect
          isClearable
          name="etatCotisation"
          label="Etat cotisation"
          placeholder=""
          fetchOptions={() =>
            Promise.resolve([
              {
                label: "A jour",
                value: "a_jour",
              },
              {
                label: "Non à jour",
                value: "non_a_jour",
              },
            ])
          }
        />
      </Col>
      <Col xs={12}>
        <SelectFonction
          name="fonction"
          label="Fonction"
          isClearable
          placeholder=""
          requestParams={{
            codeNature: perimetres,
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
              perimetres,
              organisationId: user?.personne?.organisation?.id,
            }}
          />
        </Col>
      )}

      <Col xs={12}>
        <SelectRefFormation name="niveauFormation" label="Niveau formation" isClearable placeholder="" />
      </Col>

      <Col xs={12}>
        <SelectVille name="ville" label="Ville de residence" isClearable placeholder="" />
      </Col>
    </>
  );
};

export const FilterPersonne = withFilterForm(FilterPersonneForm);
