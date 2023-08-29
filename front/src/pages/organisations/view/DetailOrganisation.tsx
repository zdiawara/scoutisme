import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Header } from "pages/common";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";
import { Link } from "react-router-dom";
import { LINKS } from "utils";

type DetailOrganisationProps = {
  organisation: OrganisationResource;
};

export const DetailOrganisation: FC<DetailOrganisationProps> = ({
  organisation,
}) => {
  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            {...Header.infoGenerale}
            description="Les informations générales de l'organisation"
          />

          <Card className="shadow-sm mt-1">
            <Card.Body>
              <Row className="g-3">
                <Col sm={4}>
                  <View.Item label="Code">{organisation.code}</View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Nom">{organisation.nom}</View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Nature">
                    {organisation.nature?.nom}
                  </View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Type">{organisation.type?.nom}</View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Parent">
                    {organisation.parent ? (
                      <Link
                        to={LINKS.organisations.view(organisation.parent.id)}
                        className="text-decoration-underline"
                      >
                        {organisation.parent.nom}
                      </Link>
                    ) : null}
                  </View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Etat">
                    <View.Etat value={organisation.etat} />
                  </View.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <View.Header
            {...Header.adresse}
            description="Adresse physique de l'organisation"
            className="mt-4"
          />

          <Card className="shadow-sm mb-0 mt-1">
            <Card.Body>
              <Row>
                <Col sm={4}>
                  <View.Item label="Ville">{organisation.ville?.nom}</View.Item>
                </Col>
                <Col sm={8}>
                  <View.Item label="Lieu">{organisation.adresse}</View.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  );
};
