import { HookModalForm, SelectTypeOrganisation, SelectVille, TextInput, View } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment, useEffect, useMemo } from "react";
import { ButtonGroup, Col, Form, ListGroup, Row, ToggleButton } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { natureApi, organisationApi } from "api";
import { NatureResource, OrganisationResource } from "types/organisation.type";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { organisationSchema } from "pages/organisations/form/organisationSchema";
import { organisationConverter } from "pages/organisations/form";
import { GeoAlt, InfoCircle } from "react-bootstrap-icons";

const Formulaire: FC<WrapperV2Props> = (props) => {
  const { watch, setValue } = useFormContext();
  const codeNature = watch("nature")?.item?.code;
  const parentCodeNature = watch("parent.codeNature");

  const { data: natures } = useQuery({
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
    const listNatures = natures?.data.filter((n) => naturesAuthorized.includes(n.code));

    if (listNatures && listNatures.length !== 0) {
      setValue("nature", {
        label: listNatures[0].nom,
        value: listNatures[0].id,
        item: listNatures[0],
      });
    }
  }, [naturesAuthorized, props.isEditMode, natures?.data, setValue]);

  // const selectNatureComponent = (
  //   <SelectNature
  //     name="nature"
  //     label="Perimetre"
  //     isClearable
  //     isRequired
  //     placeholder=""
  //     requestParams={{
  //       code: naturesAuthorized.join(";"),
  //     }}
  //     isDisabled={isLoading}
  //   />
  // );

  const selectNatureComponent = (
    <Form.Group className="position-relative">
      <Form.Label className="text-muted d-block text-uppercase fs-6">Perimetre</Form.Label>
      <ButtonGroup>
        {natures?.data
          ?.filter((e) => naturesAuthorized.includes(e.code))
          .map((nature) => {
            const selected = watch("nature")?.value;
            return (
              <ToggleButton
                key={nature.id}
                id={nature.id}
                type="checkbox"
                variant={selected === nature.id ? "outline-secondary" : "outline-secondary"}
                name="nature"
                value={nature.id}
                checked={selected === nature.id}
                onChange={({ target: { checked, name } }) => {
                  if (checked) {
                    const item = natures.data.find((e) => e.id === nature.id)!;
                    setValue(name, { label: item.nom, value: item.id, item });
                  } else {
                    setValue(name, null);
                  }
                }}
              >
                {nature.nom}
              </ToggleButton>
            );
          })}
      </ButtonGroup>
    </Form.Group>
  );

  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <ListGroup>
        <View.Toolbar icon={<InfoCircle size="1.1rem" className="me-1" />} label="Information générale" />
        <ListGroup.Item>
          <Row className="g-3">
            {naturesAuthorized.length > 1 && <Col sm={12}>{selectNatureComponent}</Col>}
            {[NATURE.unite].includes(codeNature) && (
              <Fragment>
                <Col sm={12}>
                  <SelectTypeOrganisation
                    name="type"
                    label="Type d'unite"
                    isClearable
                    isRequired={codeNature === NATURE.unite}
                    isDisabled={codeNature !== NATURE.unite}
                    requestParams={{ nature_code: codeNature }}
                    placeholder="Ex. Meute"
                  />
                </Col>
              </Fragment>
            )}
            <Col sm={12}>
              <TextInput
                name="nom"
                label={`Nom ${
                  codeNature === NATURE.unite
                    ? "de l'unite"
                    : codeNature === NATURE.groupe
                    ? "du groupe"
                    : codeNature === NATURE.region
                    ? "de la region"
                    : ""
                }`}
                isRequired
                placeholder="Ex. Balaie Citoyen"
              />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="mt-2">
        <View.Toolbar icon={<GeoAlt size="1.1rem" className="me-1" />} label="Adresse" />
        <ListGroup.Item>
          <Row className="g-2">
            <Col xs={12}>
              <SelectVille name="ville" label="Ville" placeholder="Ex. Ouagadougou" isClearable />
            </Col>
            <Col xs={12}>
              <TextInput name="adresse" label="Adresse" placeholder="Ex. Nom du quartier" />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </HookModalForm>
  );
};

const OrganisationMembreForm = withMutationForm(Formulaire, organisationSchema);

type SousOrganisationModalProps = {
  closeModal: () => void;
  organisation: OrganisationResource;
};

export const SousOrganisationModal: FC<SousOrganisationModalProps> = ({ closeModal, organisation }) => {
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
        scrollable: true,
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
        query.invalidateQueries([QUERY_KEY.organisation_enfants, organisation.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
