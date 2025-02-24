import { FC } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { View } from "components";
import { DateFormater } from "utils/DateUtils";
import * as Icon from "react-bootstrap-icons";

type PersonneDetailsProps = {
  personne: PersonneResource;
};
export const PersonneDetails: FC<PersonneDetailsProps> = ({ personne }) => {
  return (
    <>
      <ListGroup className="mb-3 shadow-sm">
        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.InfoCircle size="1.1rem" className="me-1" />
            <span className="fs-5">Identite</span>
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
              <View.Item label="Nom">{personne.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Prenom">{personne.prenom}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Genre">{personne.genre?.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Profession">{personne.profession}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Date de naissance">
                {DateFormater.toDateTime(personne.date_naissance) || undefined}
              </View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Lieu de naissance">
                {personne.lieu_naissance}
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item>

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
