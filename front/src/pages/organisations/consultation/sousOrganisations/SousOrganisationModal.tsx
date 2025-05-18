import {
  HookModalForm,
  SelectNature,
  SelectTypeOrganisation,
  SelectVille,
  TextInput,
  View,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment, useEffect, useMemo } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { natureApi, organisationApi } from "api";
import { NatureResource, OrganisationResource } from "types/organisation.type";
import { MASK, NATURE, QUERY_KEY } from "utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { organisationSchema } from "pages/organisations/form/organisationSchema";
import { organisationConverter } from "pages/organisations/form";
import { GeoAlt, InfoCircle } from "react-bootstrap-icons";

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

  const selectNatureComponent = (
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
  );

  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <ListGroup>
        <View.Toolbar
          icon={<InfoCircle size="1.1rem" className="me-1" />}
          label="Information générale"
        />
        <ListGroup.Item>
          <Row className="g-2">
            {[NATURE.unite].includes(codeNature) ? (
              <Fragment>
                <Col sm={6}>{selectNatureComponent}</Col>

                <Col sm={6}>
                  <SelectTypeOrganisation
                    name="type"
                    label="Type"
                    isClearable
                    isRequired={codeNature === NATURE.unite}
                    isDisabled={codeNature !== NATURE.unite}
                    requestParams={{ nature_code: codeNature }}
                  />
                </Col>
              </Fragment>
            ) : (
              <Fragment>
                <Col xs={12}>{selectNatureComponent}</Col>
              </Fragment>
            )}
            <Col sm={6}>
              <TextInput
                name="nom"
                label="Nom"
                placeholder="Nom de l'organisation"
                isRequired
              />
            </Col>
            <Col sm={6}>
              <TextInput
                name="code"
                label="Code"
                placeholder="code de l'organisation"
                isRequired
                mask={MASK.codeOrganisation}
              />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="mt-2">
        <View.Toolbar
          icon={<GeoAlt size="1.1rem" className="me-1" />}
          label="Adresse"
        />
        <ListGroup.Item>
          <Row className="g-2">
            <Col>
              <SelectVille
                name="ville"
                label="Ville"
                placeholder=""
                isClearable
              />
            </Col>
            <Col>
              <TextInput name="adresse" label="Lieu" placeholder="Quartier" />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
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
      subtitle={`La nouvelle sous organisation sera rattachée à ${organisation.nom}`}
      modalProps={{
        size: "lg",
      }}
      modalHeaderProps={{
        closeButton: false,
      }}
      // modalBodyClassName="bg-gray-100"
      defaultValues={{
        parent: {
          codeNature: organisation.nature.code,
        },
      }}
      onSuccess={() => {
        query.invalidateQueries([
          QUERY_KEY.organisation_enfants,
          organisation.id,
        ]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
