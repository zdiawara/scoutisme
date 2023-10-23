import {
  HookModalForm,
  SelectNature,
  SelectTypeOrganisation,
  SelectVille,
  TextInput,
  View,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { natureApi, organisationApi } from "api";
import { NatureResource, OrganisationResource } from "types/organisation.type";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "pages/common";
import { organisationSchema } from "../form/organisationSchema";
import { organisationConverter } from "../form";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch, setValue } = useFormContext();
  const codeNature = watch("nature")?.item?.code;
  const parentCodeNature = watch("parent.codeNature");

  const { data: natures, isLoading } = useQuery({
    queryKey: [QUERY_KEY.natures],
    networkMode: "offlineFirst",
    queryFn: () => natureApi.findAll<NatureResource>(),
  });

  const naturesAuthorized = useMemo(() => {
    let codes: string[] = [];
    switch (parentCodeNature) {
      case NATURE.national:
        codes = [NATURE.region];
        break;
      case NATURE.region:
        codes = [NATURE.groupe, NATURE.unite];
        break;
      case NATURE.groupe:
        codes = [NATURE.unite];
        break;
    }
    return codes;
  }, [parentCodeNature]);

  useEffect(() => {
    const listNatures = natures?.data.filter((n) =>
      naturesAuthorized.includes(n.code)
    );

    if (!props.isEditMode && listNatures?.length === 1) {
      setValue("nature", {
        label: listNatures[0].nom,
        value: listNatures[0].id,
        item: listNatures[0],
      });
    }
  }, [naturesAuthorized, props.isEditMode, natures?.data, setValue]);

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
            requestParams={{
              code: naturesAuthorized.join(";"),
            }}
            isDisabled={isLoading}
          />
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

      <View.Header
        {...Header.adresse}
        description="Ville et lieu de l'organisation"
        className="my-3"
      />

      <Row className="mb-3">
        <Col>
          <SelectVille
            name="ville"
            label="Ville"
            placeholder="Choisir"
            isClearable
          />
        </Col>
        <Col>
          <TextInput name="adresse" label="Lieu" placeholder="Quartier" />
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
      defaultValues={{
        parent: {
          codeNature: organisation.nature.code,
        },
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.organisations, organisation.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
