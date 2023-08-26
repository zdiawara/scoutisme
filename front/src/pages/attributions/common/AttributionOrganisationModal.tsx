import {
  DatePicker,
  HookModalForm,
  SelectFonction,
  SelectPersonne,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { attributionApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { attributionConverter, organisationMembreSchema } from "../form";
import { AttributionResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Formulaire commun d'ajout et de modification d'une attribution
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  const { watch } = useFormContext();
  const natureId = watch("natureId");
  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <Row className="g-2">
        <Col sm={12}>
          <SelectPersonne
            label="Personne"
            name="personne"
            isClearable
            isRequired
            requestParams={{
              type: "adulte",
            }}
          />
        </Col>
        <Col sm={12}>
          <SelectFonction
            label="Fonction"
            name="fonction"
            isClearable
            isRequired
            requestParams={{
              nature: natureId,
            }}
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

const OrganisationMembreForm = withMutationForm(Form, organisationMembreSchema);

type AddAttributionOrganisationModalProps = {
  closeModal: () => void;
  organisation: OrganisationResource;
};

/**
 * Ajouter une nouvelle attribution
 * @param param0
 * @returns
 */
export const AddAttributionOrganisationModal: FC<
  AddAttributionOrganisationModalProps
> = ({ closeModal, organisation }) => {
  const query = useQueryClient();
  const ajouterMembre = (data: Record<string, any>) => {
    const body = {
      ...attributionConverter.toBody(data),
      organisation_id: organisation.id,
    };
    return attributionApi.create(body);
  };
  return (
    <OrganisationMembreForm
      onSave={ajouterMembre}
      title="Ajouter un membre"
      subtitle="Membre de l'organe de direction"
      defaultValues={{
        natureId: organisation.nature.id,
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.attributions, organisation.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

type EditAttributionOrganisationModalProps = {
  closeModal: () => void;
  attribution: AttributionResource;
};

/**
 * Modifier une attribution
 * @param param0
 * @returns
 */
export const EditAttributionOrganisationModal: FC<
  EditAttributionOrganisationModalProps
> = ({ closeModal, attribution }) => {
  const query = useQueryClient();
  const modifierAttribution = (data: Record<string, any>) => {
    const body = {
      ...attributionConverter.toBody(data),
      organisation_id: attribution.organisation.id,
    };
    return attributionApi.update(attribution.id, body);
  };
  return (
    <OrganisationMembreForm
      onSave={modifierAttribution}
      title="Modifier un membre"
      subtitle="Membre de l'organe de direction"
      defaultValues={{
        ...attributionConverter.toInput(attribution),
        natureId: attribution.organisation.nature.id,
      }}
      onSuccess={() => {
        query.invalidateQueries([
          QUERY_KEY.attributions,
          attribution.organisation.id,
        ]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
