import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ICONS } from "pages/common";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { SousOrganisationActions } from "../common";

type SousOrganisationProps = {
  organisation: OrganisationResource;
};

export const SousOrganisation: FC<SousOrganisationProps> = ({
  organisation,
}) => {
  return (
    <>
      <Card>
        <Card.Body>
          <View.Header
            icon={ICONS.organisation}
            label="Sous organisations"
            description="Liste des sous organisations"
            className="mb-2"
            right={<SousOrganisationActions organisation={organisation} />}
          />
          {organisation.enfants?.length ? (
            <Row className="g-2 mt-1">
              {organisation.enfants.map((org) => (
                <Col sm={4} key={org.id}>
                  <Card className="m-0 border border-light">
                    <Card.Body className="text-center p-2">
                      <span>{org.nature.nom}</span>&nbsp;/&nbsp;
                      <Link
                        to={LINKS.organisations.view(org.id)}
                        className="mb-2 fw-semibold text-black"
                      >
                        {org.nom}
                      </Link>
                    </Card.Body>
                    <Card.Footer className="px-2 pt-0 border-0 text-right d-flex">
                      <Link
                        to={LINKS.organisations.view(org.id)}
                        className="btn btn-sm btn-secondary mx-auto"
                      >
                        Voir la fiche
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <View.Empty label="Pas d'organisations enfants" />
          )}
        </Card.Body>
      </Card>
    </>
  );
};
