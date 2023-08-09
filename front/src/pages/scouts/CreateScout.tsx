import { FC } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import UserBox from "./UserBox";
import Select, { components } from "react-select";
import { PageHeader } from "pages/common";

const Control = ({ children, ...props }: any) => {
  return <components.Control {...props}>{children}</components.Control>;
};

const CreateScout: FC = () => {
  return (
    <>
      <PageHeader.View
        title="Créer un scout"
        left={
          <Button variant="light" size="sm">
            <i className="uil-arrow-left fs-5 me-2"></i>
            Retour
          </Button>
        }
        right={
          <>
            <Button className="me-1" variant="danger">
              Annuler
            </Button>
            <Button variant="primary">Enregistrer</Button>
          </>
        }
      />

      <Row>
        <Col xl={3} lg={3}>
          <UserBox />
        </Col>
        <Col xl={9} lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form>
                <h5 className="mb-3 mt-0 text-uppercase bg-light p-2">
                  <i className="mdi mdi-office-building me-1"></i> Information
                  personnelle
                </h5>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Nom</Form.Label>
                      <Form.Control
                        type="text"
                        className="text-black fw-semibold"
                        placeholder="Nom du scout"
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control
                        type="text"
                        className="text-black fw-semibold"
                        placeholder="Prénom du scout"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Date naissance</Form.Label>
                      <Form.Control
                        type="text"
                        className="text-black"
                        placeholder="Date de naissance"
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Lieu de naissance</Form.Label>
                      <Form.Control
                        type="text"
                        className="text-black"
                        placeholder="Lieu de naissance"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mb-3 mt-3 text-uppercase bg-light p-2">
                  <i className="mdi mdi-office-building me-1"></i> Contact
                </h5>

                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <InputGroup className="mb-2">
                        <Button as="div" className="border" variant="light">
                          <i className="uil-envelope"></i>
                        </Button>
                        <Form.Control
                          type="text"
                          className="text-black"
                          placeholder="Adresse email"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Adresse</Form.Label>

                      <InputGroup className="mb-2">
                        <Button variant="light" className="border">
                          <i className="uil-location-pin-alt"></i>
                        </Button>
                        <Form.Control
                          type="text"
                          className="text-black"
                          placeholder="Adresse postal"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Row className="mt-3">
                      <Col>
                        <InputGroup className="mb-2">
                          <Button variant="light" className="border">
                            <i className="uil-phone"></i>
                          </Button>
                          <Form.Control
                            type="text"
                            className="text-black"
                            placeholder="Numéro de téléphone"
                          />
                          <Button variant="danger">
                            <i className="uil-trash"></i>
                          </Button>
                        </InputGroup>

                        <Button variant="dark" size="sm">
                          <i className="uil-plus"></i> Numéro
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>

              <h5 className="mb-3 mt-3 text-uppercase bg-light p-2">
                <i className="mdi mdi-office-building me-1"></i> Adhésion
              </h5>
              <Row className="mb-3">
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>Date d'adhésion</Form.Label>
                    <Form.Control
                      type="text"
                      className="text-black"
                      placeholder="Date adhesion"
                    />
                  </Form.Group>
                </Col>

                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>Organisation</Form.Label>
                    <Select
                      className="react-select text-black fw-semibold"
                      classNamePrefix="react-select"
                      options={[
                        { value: "chocolate", label: "Unité 1" },
                        { value: "strawberry", label: "Unité 2" },
                        { value: "vanilla", label: "Unité 3" },
                      ]}
                      components={{ Control }}
                    />
                  </Form.Group>
                </Col>

                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>Fonction</Form.Label>
                    <Select
                      className="react-select"
                      classNamePrefix="react-select"
                      options={[
                        { value: "chocolate", label: "Membre" },
                        { value: "strawberry", label: "Chef" },
                        { value: "vanilla", label: "Chef Adj." },
                      ]}
                      components={{ Control }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateScout;
