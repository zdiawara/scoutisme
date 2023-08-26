import {
  HookModalForm,
  SelectNature,
  SelectTypeOrganisation,
  SelectVille,
  TextInput,
  View,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Header } from "pages/common";
import { organisationSchema } from "../form/organisationSchema";
import { organisationConverter } from "../form";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch } = useFormContext();
  const codeNature = watch("nature")?.item?.code;

  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <Row className="g-2">
        <View.Header
          {...Header.infoGenerale}
          className="mb-0"
          description="Les informations générales de l'organisation"
        />
        <Col sm={6}>
          <SelectNature name="nature" label="Nature" isClearable isRequired />
        </Col>

        <Col sm={6}>
          <SelectTypeOrganisation
            name="type"
            label="Type"
            isClearable
            isRequired={codeNature === NATURE.unite}
            isDisabled={codeNature !== NATURE.unite}
          />
        </Col>
        <Col sm={12}>
          <TextInput
            name="nom"
            label="Nom"
            placeholder="Nom de l'organisation"
            isRequired
          />
        </Col>
      </Row>

      <Row className="g-2 mt-3 ">
        <View.Header
          {...Header.adresse}
          description="Adresse physique de l'organisation"
        />
        <Col xs={12}>
          <SelectVille name="ville" label="Ville" isRequired />
        </Col>
        <Col sm={6}>
          <TextInput
            name="adresse.secteur"
            label="Secteur"
            placeholder="Secteur de l'organisation"
          />
        </Col>
        <Col sm={6}>
          <TextInput
            name="adresse.emplacement"
            label="Emplacement"
            placeholder="Emplacement de l'organisation"
          />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const OrganisationMembreForm = withMutationForm(Form, organisationSchema);

type SousOrganisationModalProps = {
  closeModal: () => void;
  organisation: OrganisationResource;
};

export const SousOrganisationModal: FC<SousOrganisationModalProps> = ({
  closeModal,
  organisation,
}) => {
  const query = useQueryClient();
  const createSousOrganisation = (data: Record<string, any>) => {
    const body = {
      ...organisationConverter.toBody(data),
      parent_id: organisation.id,
    };
    return organisationApi.create(body);
  };
  return (
    <OrganisationMembreForm
      onSave={createSousOrganisation}
      title="Ajouter une sous organisation"
      subtitle={`Cette organisation sera rattachée à ${organisation.nom}`}
      modalProps={{
        size: "lg",
      }}
      modalHeaderProps={{
        closeButton: false,
      }}
      modalBodyClassName="bg-light p-3"
      defaultValues={{}}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.organisations, organisation.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
