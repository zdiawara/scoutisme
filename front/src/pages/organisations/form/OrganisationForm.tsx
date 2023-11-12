import { FC, useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Header, PageHeader } from "pages/common";
import {
  SelectNature,
  SelectOrganisation,
  SelectTypeOrganisation,
  SelectVille,
  TextInput,
  View,
} from "components";
import { WrapperProps, withForm } from "hoc";
import { organisationSchema } from "./organisationSchema";
import { useFormContext } from "react-hook-form";
import { NATURE } from "utils/constants";

const FormContainer: FC<WrapperProps> = ({
  renderButtons,
  title,
  subtitle,
}) => {
  const { watch, setValue } = useFormContext();

  const codeNature = watch("nature")?.item?.code;

  const parentResetDeps = useMemo(() => {
    return [codeNature];
  }, [codeNature]);

  const buildParentsRequestParams = () => {
    switch (codeNature) {
      case NATURE.unite:
        return { codeNature: [NATURE.groupe, NATURE.region].join(";") };
      case NATURE.groupe:
        return { codeNature: NATURE.region };
      case NATURE.region:
        return { codeNature: NATURE.national };
      default:
        return { codeNature: NATURE.national };
    }
  };

  return (
    <>
      <PageHeader.View
        title={title!}
        subtitle={subtitle}
        right={renderButtons()}
        className="my-4"
      />

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            {...Header.infoGenerale}
            description="Informations générales de l'organisation"
            className="mb-4"
          />
          <Row className="g-3">
            <Col sm={4}>
              <SelectNature
                name="nature"
                label="Nature"
                isClearable
                isRequired
                afterSelected={() => {
                  setValue("type", null);
                  setValue("parent", null);
                }}
              />
            </Col>
            <Col sm={4}>
              <SelectTypeOrganisation
                name="type"
                label="Type"
                isClearable
                isRequired={[NATURE.national, NATURE.national].includes(
                  codeNature
                )}
                requestParams={{ nature_code: codeNature }}
                resetDeps={[watch("nature")?.value]}
                isDisabled={
                  ![NATURE.national, NATURE.national].includes(codeNature)
                }
              />
            </Col>
            <Col sm={4}>
              <TextInput
                name="nom"
                label="Nom"
                placeholder="Nom de l'organisation"
                isRequired
              />
            </Col>
            <Col sm={12}>
              <SelectOrganisation
                name="parent"
                label="Parent"
                isClearable
                requestParams={buildParentsRequestParams()}
                resetDeps={parentResetDeps}
                isDisabled={!codeNature}
                isRequired={["unite", "groupe", "region"].includes(codeNature)}
              />
            </Col>
          </Row>

          <View.Header
            {...Header.adresse}
            description="Ville et lieu de l'organisation"
            className="my-4"
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
        </Card.Body>
      </Card>
    </>
  );
};

export const OrganisationForm = withForm(FormContainer, organisationSchema);
