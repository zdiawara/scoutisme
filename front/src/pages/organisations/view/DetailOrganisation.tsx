import { FC } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import * as Icon from "react-bootstrap-icons";

type DetailOrganisationProps = {
  organisation: OrganisationResource;
};

export const DetailOrganisation: FC<DetailOrganisationProps> = ({
  organisation,
}) => {
  return (
    <>
      <ListGroup className="shadow-sm">
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
              <View.Item label="Nom">{organisation.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Code">{organisation.code}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Nature">{organisation.nature.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Type">{organisation.type?.nom}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <View.Item label="Parent">
            {organisation.parent ? (
              <Link
                to={LINKS.organisations.view(organisation.parent.id)}
                className="text-decoration-underline text-black"
              >
                {organisation.parent.nom}
              </Link>
            ) : null}
          </View.Item>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.GeoAlt size="1.1rem" className="me-1" />
            <span className="fs-5">Adresse</span>
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
          <Row>
            <Col xs={6}>
              <View.Item label="Ville">{organisation.ville?.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Lieu">{organisation.adresse}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>

        {/* <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.Building size="1.1rem" className="me-1" />
            <span className="fs-5">Sous organisation</span>
          </span>
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="outline-primary"
          >
            <Icon.PlusLg className="me-0" />
          </Button>
        </ListGroup.Item> */}
      </ListGroup>
    </>
  );
};
