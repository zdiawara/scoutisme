import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Header, ICONS, PageHeader } from "pages/common";
import { Link, useParams } from "react-router-dom";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";
import { Organigramme } from "./view";

const ViewOrganisation: FC = () => {
  const { id } = useParams();
  const { data: organisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, id],
    queryFn: ({ queryKey }) => {
      return organisationApi.findById<OrganisationResource>(
        queryKey[1] as string
      );
    },
  });

  const actions = () => {
    if (!organisation) {
      return null;
    }

    return (
      <div className="ms-auto d-flex">
        <Link
          className="rounded-corner btn btn-danger"
          to={LINKS.organisations.edit(organisation.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>

        {/*         <Dropdown className="ms-2">
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
        </Dropdown> */}
      </div>
    );
  };

  if (isLoading || !organisation) {
    return <span>chargement ...</span>;
  }

  return (
    <>
      <PageHeader.View
        title={organisation.nom}
        subtitle={`Code : ${organisation.code}`}
        right={actions()}
      />

      <Row>
        <Col xl={3} lg={3}>
          <Organigramme parents={organisation.parents} />
        </Col>
        <Col xl={9} lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <View.Header {...Header.infoGenerale} className="mb-4" />
              <Row className="g-3">
                <Col sm={3}>
                  <View.Item label="Code">{organisation.code}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Nom">{organisation.nom}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Nature">
                    {organisation.nature?.nom}
                  </View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Type">{organisation.type?.nom}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Parent">
                    {organisation.parent?.nom}
                  </View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Etat">
                    <View.Etat value={organisation.etat} />
                  </View.Item>
                </Col>
              </Row>

              <View.Header {...Header.adresse} className="my-4" />
              <Row>
                <Col sm={3}>
                  <View.Item label="Ville">{organisation.ville?.nom}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Secteur">
                    {organisation.adresse?.secteur}
                  </View.Item>
                </Col>
                <Col sm={6}>
                  <View.Item label="Emplacement">
                    {organisation.adresse?.emplacement}
                  </View.Item>
                </Col>
              </Row>

              <View.Header
                label="Organisations rattachées"
                icon={ICONS.organisation}
                className="my-4"
              />

              {organisation.enfants?.length ? (
                <Row className="g-3">
                  {organisation.enfants?.map((org) => (
                    <Col sm={4} key={org.id}>
                      <Card className="shadow-sm m-0 border">
                        <Card.Body className="d-flex align-items-center p-2">
                          <Card.Title as="div" className="text-black m-0">
                            {org.nom}
                            <Card.Text className="text-muted">
                              {org.nature.nom}
                            </Card.Text>
                          </Card.Title>
                          <Link
                            className="ms-auto btn btn-info btn-sm"
                            to={LINKS.organisations.view(org.id)}
                          >
                            <i className="uil-eye"></i> voir
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <View.Empty label="Pas d'organisations enfants" />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewOrganisation;
