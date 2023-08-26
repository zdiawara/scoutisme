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
          <View.Header {...Header.infoGenerale} className="mb-4" />
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
                isRequired={codeNature === "unite"}
                isDisabled={codeNature !== "unite"}
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

          <View.Header {...Header.adresse} className="my-4" />

          <Row className="mb-3">
            <Col>
              <SelectVille name="ville" label="Ville" isRequired />
            </Col>
            <Col>
              <TextInput
                name="adresse.secteur"
                label="Secteur"
                placeholder="Secteur de l'organisation"
              />
            </Col>
            <Col>
              <TextInput
                name="adresse.emplacement"
                label="Emplacement"
                placeholder="Emplacement de l'organisation"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export const OrganisationForm = withForm(FormContainer, organisationSchema);
