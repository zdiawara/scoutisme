import { FC, useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PageHeader } from "pages/common";
import { Link } from "react-router-dom";
import {
  SelectNature,
  SelectOrganisation,
  SelectTypeOrganisation,
  SelectVille,
  TextInput,
} from "components";
import { WrapperProps, withForm } from "hoc";
import { organisationSchema } from "./organisationSchema";
import { useFormContext } from "react-hook-form";

const FormContainer: FC<WrapperProps> = ({ renderButtons, backUrl }) => {
  const { watch, setValue } = useFormContext();

  const codeNature = watch("nature")?.item?.code;

  const resetDeps = useMemo(() => {
    return [codeNature];
  }, [codeNature]);

  const buildRequestParams = () => {
    switch (codeNature) {
      case "unite":
        return { codeNature: "groupe" };
      case "groupe":
        return { codeNature: "equipe_regionale" };
      case "equipe_regionale":
        return { codeNature: "equipe_nationale" };
      case "equipe_nationale":
        return { codeNature: "conseil_national" };
      default:
        break;
    }
  };

  return (
    <>
      <PageHeader.View
        title="Créer une organisation"
        left={
          backUrl && (
            <Link className="btn btn-sm btn-light" to={backUrl}>
              <i className="uil-arrow-left fs-5 me-2"></i>
              Retour
            </Link>
          )
        }
        right={renderButtons()}
      />

      <Row>
        <Col sm={10} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h5
                className="mb-3 text-uppercase  text-black p-2 rounded shadow-sm"
                style={{ backgroundColor: "#eee" }}
              >
                <i className="mdi mdi-office-building me-1"></i>
                Information generale
              </h5>
              <Row className="mb-3">
                <Col>
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
                <Col>
                  <TextInput
                    name="nom"
                    label="Nom"
                    placeholder="Nom de l'organisation"
                    isRequired
                  />
                </Col>
                <Col>
                  <SelectTypeOrganisation
                    name="type"
                    label="Type"
                    isClearable
                    isRequired={codeNature === "unite"}
                    isDisabled={codeNature !== "unite"}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <SelectOrganisation
                    name="parent"
                    label="Parent"
                    isClearable
                    requestParams={buildRequestParams()}
                    resetDeps={resetDeps}
                    isDisabled={codeNature === "conseil_national"}
                    isRequired={[
                      "unite",
                      "groupe",
                      "equipe_regionale",
                      "equipe_nationale",
                    ].includes(codeNature)}
                  />
                </Col>
              </Row>

              <h5
                className="mb-3 text-uppercase  text-black p-2 rounded shadow-sm"
                style={{ backgroundColor: "#eee" }}
              >
                <i className="mdi mdi-office-building me-1"></i> Adresse
              </h5>

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

              {/* <h5
                className="mb-3 text-uppercase  text-black p-2 rounded shadow-sm"
                style={{ backgroundColor: "#eee" }}
              >
                <i className="mdi mdi-office-building me-1"></i> Personnes
              </h5>
              <Row className="mb-3">
                <Col sm={4}>
                  <Select name="personne" label="Personne" />
                </Col>

                <Col sm={4}>
                  <Select name="fonction" label="Fonction" />
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>Date début</Form.Label>
                    <Form.Control
                      type="text"
                      className="text-black"
                      placeholder="Date adhesion"
                    />
                  </Form.Group>
                </Col>
              </Row> */}

              {/*               <Row>
                <Col>
                  <Button size="sm">Ajouter une personne</Button>
                </Col>
              </Row> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export const OrganisationForm = withForm(FormContainer, organisationSchema);
