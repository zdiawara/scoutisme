import { FC } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Header, PageHeader } from "pages/common";
import { Link, useParams } from "react-router-dom";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";

const ViewOrganisation: FC = () => {
  const { id } = useParams();
  const { data: organisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, id],
    keepPreviousData: true,
    queryFn: ({ queryKey }) => {
      return organisationApi.findById<OrganisationResource>(
        queryKey[1] as string
      );
    },
  });

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

  if (isLoading || !organisation) {
    return <span>chargement ...</span>;
  }

  return (
    <>
      <PageHeader.View
        title={organisation.nom}
        subtitle={`Code : ${organisation.code}`}
        left={
          <Link to={LINKS.organisations.base} className="btn btn-light btn-sm">
            <i className="uil-arrow-left fs-5 me-2"></i>
            Retour
          </Link>
        }
        right={actions()}
      />

      <Row>
        <Col xl={3} lg={3}>
          <Card className="text-black">
            <Card.Header className="fw-semibold border-0">
              Organigramme
            </Card.Header>
            <Card.Body className="p-1">
              <ListGroup className="text-center">
                <ListGroup.Item className="border-1 fs-7 p-1" action>
                  <span className="text-secondary">Région :</span>
                  &nbsp;Haut bassins
                </ListGroup.Item>
                <ListGroup.Item className="border-0 p-0">
                  <i className="uil-angle-down fs-3"></i>
                </ListGroup.Item>
                <ListGroup.Item className="border-1 fs-7 p-1" action>
                  <span className="text-secondary">Groupe :</span>
                  &nbsp;{organisation.parent?.nom}
                </ListGroup.Item>
                <ListGroup.Item className="border-0 rounded p-0">
                  <i className="uil-angle-down fs-3"></i>
                </ListGroup.Item>
                <ListGroup.Item className="p-1 rounded bg-light">
                  <span className="text-secondary">
                    {organisation.nature.nom} :
                  </span>
                  &nbsp;
                  {organisation.nom}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={9} lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <View.Header {...Header.infoGenerale} className="mt-0" />
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

              <View.Header {...Header.adresse} />
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewOrganisation;
