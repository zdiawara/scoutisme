import { FC } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { View } from "components";
import * as Icon from "react-bootstrap-icons";
import { PersonneIdentite } from "./profil/identite/PersonneIdentite";

type PersonneDetailProps = {
  personne: PersonneResource;
};

const PersonneDetail: FC<PersonneDetailProps> = ({ personne }) => {
  return (
    <>
      <ListGroup className="mb-3 shadow-sm">
        <PersonneIdentite personne={personne} />
        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.Telephone size="1.1rem" className="me-1" />
            <span className="fs-5">Coordonnées</span>
          </span>
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="outline-primary"
          >
            <Icon.Pencil className="me-0" />
          </Button>
        </ListGroup.Item>

        <ListGroup.Item>
          <View.Item label="Num. Tel">{personne.telephone}</View.Item>
        </ListGroup.Item>
        <ListGroup.Item>
          <View.Item label="Email">{personne.email}</View.Item>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Ville">{personne.ville?.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Adresse">{personne?.adresse}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.Briefcase size="1.1rem" className="me-1" />
            <span className="fs-5">Formation</span>
          </span>
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="outline-primary"
          >
            <Icon.PlusLg className="me-0" />
          </Button>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-bold">Camps</div>
            <span className="fw-light">Janv 2025</span>
          </div>
          <Button className="ms-auto d-block" size="sm" variant="default">
            <Icon.ThreeDotsVertical />
          </Button>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.FileEarmarkPerson size="1.1rem" className="me-1" />
            <span className="fs-5">Personne à contacter</span>
          </span>
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="outline-primary"
          >
            <Icon.Pencil className="me-0" />
          </Button>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Nom">
                {personne.personne_a_contacter?.nom}
              </View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Relation">
                {personne.personne_a_contacter?.relation}
              </View.Item>
            </Col>
            {/* <Col sm={3}>
                  <View.Item label="Téléphone">
                    {personne.personne_a_contacter?.telephone}
                  </View.Item>
                </Col> */}
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="g-3">
            <Col sm={3}>
              <View.Item label="Telephone">
                {personne.personne_a_contacter?.telephone}
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default PersonneDetail;
