import {
  DatePicker,
  HookModalForm,
  SelectPersonneSansFonction,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { attributionApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { attributionConverter, organisationMembreSchema } from "../form";
import { FonctionResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { useQueryClient } from "@tanstack/react-query";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-2">
        <Col sm={12}>
          <SelectPersonneSansFonction
            label="Personne"
            name="personne"
            isClearable
            isRequired
            requestParams={{
              type: "adulte",
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

type OrganisationMembreModalProps = {
  organisation: OrganisationResource;
  fonction: FonctionResource;
  closeModal: () => void;
};

/**
 *
 * @param param0
 * @returns
 */
export const OrganisationMembreModal: FC<OrganisationMembreModalProps> = ({
  organisation,
  fonction,
  closeModal,
}) => {
  const query = useQueryClient();

  const ajouterMembre = (data: Record<string, any>) => {
    const body = {
      ...attributionConverter.toBody(data),
      organisation_id: organisation.id,
      fonction_id: fonction.id,
    };
    return attributionApi.create(body);
  };

  return (
    <OrganisationMembreForm
      onSave={ajouterMembre}
      title="Ajouter un membre"
      subtitle={`Selectionner ${fonction.nom}`}
      defaultValues={{
        natureId: organisation.nature.id,
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.direction, organisation.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
