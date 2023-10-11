import {
  DatePicker,
  HookModalForm,
  SelectFonction,
  SelectOrganisation,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { personneApi } from "api";
import { attributionConverter, personneAttributionSchema } from "../form";
import { PersonneResource } from "types/personne.type";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-2">
        {/*         <Col>
          <Alert variant="warning" className="mb-0">
            Attention, le mail sera envoyé à toutes les persones
          </Alert>
        </Col> */}
        <Col sm={12}>
          <SelectFonction
            label="Fonction"
            name="fonction"
            isClearable
            isRequired
            requestParams={{}}
          />
        </Col>
        <Col sm={12}>
          <SelectOrganisation
            label="Organisation"
            name="organisation"
            isClearable
            isRequired
            requestParams={{}}
          />
        </Col>
        <Col sm={6}>
          <DatePicker
            name="date_debut"
            label="Date début"
            useHookForm
            required
          />
        </Col>

        <Col sm={6}>
          <DatePicker name="date_fin" label="Date fin" useHookForm />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const OrganisationMembreForm = withMutationForm(
  Form,
  personneAttributionSchema
);

type AffecterPersonneModalProps = {
  personne: PersonneResource;
  closeModal: () => void;
};

/**
 *
 * @param param0
 * @returns
 */
export const AffecterPersonneModal: FC<AffecterPersonneModalProps> = ({
  personne,
  closeModal,
}) => {
  const query = useQueryClient();

  const ajouterMembre = (data: Record<string, any>) => {
    const { personne_id, ...rest } = attributionConverter.toBody(data);

    const body = { ...rest, type: "direction" };

    return personneApi.affecter(personne.id, body);
  };

  return (
    <OrganisationMembreForm
      onSave={ajouterMembre}
      title={`Affecter ${personne.nom} ${personne.prenom} dans une organisation`}
      onSuccess={(data) => {
        query.invalidateQueries([QUERY_KEY.direction, data.organisation.id]);
        query.invalidateQueries([QUERY_KEY.attributions, personne.id]);
        query.invalidateQueries([QUERY_KEY.attribution_active, personne.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
