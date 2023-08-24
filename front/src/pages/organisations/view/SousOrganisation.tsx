import { FC, Fragment } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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
      <Card className="shadow-sm">
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
              {organisation.enfants?.map((org) => (
                <Col sm={4} key={org.id}>
                  <Card className="m-0 border">
                    <Card.Body className="text-center">
                      <Link
                        to={LINKS.organisations.view(org.id)}
                        className="mb-2 fw-semibold text-black"
                      >
                        {org.nom}
                      </Link>
                      <p className="m-0 mt-1">{org.nature.nom}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <View.Empty label="Pas d'organisations enfants" />
              <Button size="sm" variant="link">
                Ajouter
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
