import { SelectEtatPaiement, SelectFonction, SelectOrganisation } from "components";
import { withFilterForm } from "hoc";
import { useAuth } from "hooks/useAuth";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { buildPerimetres } from "utils/functions";

const FilterPaiementForm: FC = () => {
  const { user, userDroit } = useAuth();

  const codeNature = user?.personne?.organisation?.nature?.code;

  const perimetres = codeNature ? buildPerimetres(codeNature).join(";") : null;

  return (
    <>
      <Col xs={12}>
        <SelectEtatPaiement
          name="etat"
          label="Etat paiement"
          isClearable
          placeholder=""
          requestParams={{
            perimetres,
            organisationId: user?.personne?.organisation?.id,
          }}
        />
      </Col>
      {!userDroit?.hasOnlyPerimetreUnite() && (
        <Col xs={12}>
          <SelectOrganisation name="organisation" label="Organisation" isClearable placeholder="" />
        </Col>
      )}
      {!userDroit?.hasOnlyPerimetreUnite() && (
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
      )}
    </>
  );
};

export const FilterPaiement = withFilterForm(FilterPaiementForm);
