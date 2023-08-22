import { FC, Fragment } from "react";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import { ICONS } from "pages/common";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";
import { Link } from "react-router-dom";
import { LINKS } from "utils";

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
            right={
              <Dropdown className="ms-2">
                <Dropdown.Toggle variant="light">Actions</Dropdown.Toggle>
                <Dropdown.Menu className="topbar-dropdown-menu mt-2">
                  <div>
                    {[
                      {
                        label: "Ajouter sous orga.",
                        icon: "uil-plus",
                        description: "Rattacher une sous organisation",
                      },
                      {
                        label: "Exporter",
                        icon: "uil-down-arrow",
                        description:
                          "Exporter les organisations au format excel",
                      },
                    ].map((item, i) => {
                      return (
                        <Fragment key={i + "-profile-menu"}>
                          <Dropdown.Item as="button" className="py-2 px-3">
                            <i className={`${item.icon} text-black me-2`}></i>
                            <span className="text-black fs-5 fw-semibold">
                              {item.label}
                            </span>
                            <div className="text-secondary">
                              {item.description}
                            </div>
                          </Dropdown.Item>
                        </Fragment>
                      );
                    })}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            }
          />
          {organisation.enfants?.length ? (
            <Row className="g-2">
              {organisation.enfants?.map((org) => (
                <Col sm={4} key={org.id}>
                  <Card className="m-0">
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
