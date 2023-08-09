import { FC } from "react";
import { Badge, Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import UserBox from "./UserBox";
import { PageHeader } from "pages/common";
import { Link } from "react-router-dom";

const ViewScout: FC = () => {
  const actions = () => {
    return (
      <div className="ms-auto d-flex">
        <Button className="rounded-corner" variant="danger">
          <i className="uil-edit-alt"></i> Modifier
        </Button>

        <Dropdown className="ms-2">
          <Dropdown.Toggle variant="outline-secondary">Actions</Dropdown.Toggle>
          <Dropdown.Menu className="topbar-dropdown-menu mt-2">
            <Dropdown.Header>Options sur le scout</Dropdown.Header>
            <div>
              {[
                {
                  label: "Affecter",
                  icon: "uil-link",
                  description: "Affecter le scout à une organisation",
                },
                {
                  label: "Carte adhésion",
                  icon: "uil-down-arrow",
                  description: "Telecharger la carte d'adhésion",
                },
              ].map((item, i) => {
                return (
                  <Dropdown.Item as="button" key={i + "-profile-menu"}>
                    <i className={`${item.icon} text-black me-2`}></i>
                    <span className="text-black fw-semibold">{item.label}</span>
                    <div className="text-secondary">{item.description}</div>
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Divider />
              <Dropdown.Item as="button">
                <i className={`uil-padlock text-black me-2`}></i>
                <span className="text-black fw-semibold">Désactiver</span>
                <div className="text-secondary">Rendre inactif le scout</div>
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };
  return (
    <>
      <PageHeader.View
        title="Zakaridia DIAWARA"
        subtitle="N° 1233555"
        left={
          <Link to="/scouts" className="btn btn-light btn-sm">
            <i className="uil-arrow-left fs-5 me-2"></i>
            Retour
          </Link>
        }
        right={actions()}
      />

      <Row>
        <Col xl={3} lg={3}>
          <UserBox />
        </Col>
        <Col xl={9} lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3 mt-0 text-uppercase bg-light p-2">
                <i className="mdi mdi-office-building me-1"></i> Information
                personnelle
              </h5>
              <Row>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary">Numéro</h4>
                  <p className="font-13 mb-2">0487820</p>
                </Col>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary">Nom</h4>
                  <p className="font-13 mb-2">DIAWARA</p>
                </Col>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary fw-semibold">Prénom</h4>
                  <p className="font-13 text-black mb-2">Zakaridia</p>
                </Col>

                <Col sm={3}>
                  <h4 className="font-13 text-secondary">Etat</h4>
                  <p className="font-13 mb-2">
                    <Badge bg="success">Actif</Badge>
                  </p>
                </Col>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary">Naissance</h4>
                  <p className="font-13 mb-2">25/04/1990 à Bobo Dioulasso</p>
                </Col>
              </Row>

              <h5 className="mb-3 mt-3 text-uppercase bg-light p-2">
                <i className="mdi mdi-office-building me-1"></i> Contact
              </h5>
              <Row>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary">Numéro téléphone</h4>
                  <p className="font-13 mb-2">07 82 31 02 93</p>
                </Col>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary fw-semibold">Email</h4>
                  <p className="font-13 text-black mb-2">
                    Zakaridia.diawara@gmail.com
                  </p>
                </Col>
                <Col sm={6}>
                  <h4 className="font-13 text-secondary">Adresse</h4>
                  <p className="font-13 mb-2">
                    Accart ville secteur 10 près du marché
                  </p>
                </Col>
              </Row>

              <h5 className="mb-3 mt-3 text-uppercase bg-light p-2">
                <i className="mdi mdi-office-building me-1"></i> Adhésion
              </h5>
              <Row>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary">Cotisation</h4>
                  <p className="font-13 mb-2">
                    <Badge bg="success">A jour</Badge>
                  </p>
                </Col>
                <Col sm={3}>
                  <h4 className="font-13 text-secondary fw-semibold">
                    Date adhésion
                  </h4>
                  <p className="font-13 text-black mb-2">25/04/1990</p>
                </Col>
                <Col sm={6}>
                  <h4 className="font-13 text-secondary">Rôle</h4>
                  <p className="font-13 mb-2">Membre de l'unité Lafia</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewScout;
