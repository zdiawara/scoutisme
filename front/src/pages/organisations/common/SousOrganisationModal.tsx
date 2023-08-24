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
import { attributionApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Header } from "pages/common";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch } = useFormContext();
  const natureId = watch("natureId");
  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <Row className="g-2">
        <View.Header
          {...Header.infoGenerale}
          className="mb-0"
          description="Les informations générales de l'organisation"
        />
        <Col sm={6}>
          <SelectNature
            name="nature"
            label="Nature"
            isClearable
            isRequired
            afterSelected={() => {
              /* setValue("type", null);
                      setValue("parent", null); */
            }}
          />
        </Col>

        <Col sm={6}>
          <SelectTypeOrganisation
            name="type"
            label="Type"
            isClearable
            /* isRequired={codeNature === "unite"}
                    isDisabled={codeNature !== "unite"} */
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

const OrganisationMembreForm = withMutationForm(Form);

type SousOrganisationModalProps = {
  closeModal: () => void;
  organisation: OrganisationResource;
};

export const SousOrganisationModal: FC<SousOrganisationModalProps> = ({
  closeModal,
  organisation,
}) => {
  const query = useQueryClient();

  return (
    <OrganisationMembreForm
      onSave={attributionApi.create}
      title="Ajouter une sous organisation"
      subtitle={`Cette organisation sera rattachée à ${organisation.nom}`}
      modalProps={{
        size: "lg",
        closeButton: false,
      }}
      modalBodyClassName="bg-light p-3"
      defaultValues={{
        parent: { label: organisation.nom, value: organisation.id },
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.attributions, organisation.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
