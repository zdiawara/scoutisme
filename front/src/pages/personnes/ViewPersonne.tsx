import { FC, useState } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { ICONS, PageHeader } from "pages/common";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { attributionApi, personneApi } from "api";
import { AttributionResource, PersonneResource } from "types/personne.type";
import { PersonneBox } from "./view/PersonneBox";
import { View } from "components";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import classNames from "classnames";
import { PersonneCard, PersonneDetails, PersonneFonctions } from "./view";

const TABS = [
  { label: "Fiche détaillée", code: "fiche", icon: "uil uil-bookmark" },
  {
    label: "Carte membres",
    code: "carte",
    icon: "mdi mdi-card-account-details-outline",
  },
  { label: "Fonctions", code: "fonctions", icon: ICONS.fonction },
];

const ViewPersonne: FC = () => {
  const id = useParams().id!;
  const [page, setPage] = useState<string>("fiche");

  const { data: personne, isLoading } = useQuery({
    queryKey: [QUERY_KEY.personnes, id],
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return personneApi.findById<PersonneResource>(queryKey[1] as string);
    },
  });

  const { data: attribution } = useQuery({
    queryKey: [QUERY_KEY.attribution_active, { personneId: id }],
    networkMode: "offlineFirst",
    queryFn: async ({ queryKey }) => {
      const { data } = await attributionApi.findAll<AttributionResource>({
        personneId: (queryKey[1] as any).personneId,
        actif: true,
        projection: "organisation.nature;fonction",
      });
      return data.length ? data[0] : null;
    },
  });

  const actions = () => {
    if (!personne) {
      return null;
    }
    return (
      <div className="ms-auto d-flex">
        <Link
          className="rounded-corner btn btn-primary"
          to={LINKS.personnes.edit(personne.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>
        {/* 
        <Dropdown className="ms-2">
          <Dropdown.Toggle variant="secondary">Actions</Dropdown.Toggle>
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

  const onSelectPage = (pageSelected: string) => () => {
    setPage(pageSelected);
  };

  const renderContent = () => {
    if (!personne) {
      return null;
    }
    switch (page) {
      case "carte":
        return <PersonneCard />;
      case "fonctions":
        return <PersonneFonctions personneId={id} />;
      default:
        return <PersonneDetails personne={personne} />;
    }
  };

  if (isLoading || !personne) {
    return <span>chargement ...</span>;
  }

  return (
    <>
      <PageHeader.View
        title={`${personne.nom} ${personne.prenom}`}
        subtitle={`Code : ${personne.code}`}
        right={actions()}
        className="my-4"
      />

      <Row>
        <Col xl={3} lg={3}>
          <PersonneBox
            source={personne.photo}
            title={
              <>
                <div className="mb mt-2 fs-4">
                  {personne.nom} {personne.prenom}
                </div>
                <Badge className="bg-primary text-uppercase">
                  {personne.type}
                </Badge>
              </>
            }
          >
            <div className="text-start mt-2">
              <div className="font-13">
                <i className={`${ICONS.fonction} me-1`}></i>
                Fonction
              </div>
              <View.Item>{attribution?.fonction?.nom}</View.Item>
              <hr />
              <div className="font-13">
                <i className={`${ICONS.organisation} me-1`}></i>
                Organisation
              </div>
              <View.Item>
                {attribution?.organisation ? (
                  <>
                    <span className="text-muted">
                      {attribution.organisation.nature.nom}
                      &nbsp;/&nbsp;
                    </span>
                    <Link
                      to={LINKS.organisations.view(attribution.organisation.id)}
                      className="text-decoration-underline"
                    >
                      {attribution.organisation.nom}
                    </Link>
                  </>
                ) : null}
              </View.Item>
            </div>
          </PersonneBox>

          <Card>
            <Card.Body className="p-2">
              <ListGroup defaultActiveKey="#link1">
                {TABS.map((item) => (
                  <ListGroup.Item
                    key={item.code}
                    className={classNames("border-0 rounded", {
                      active: item.code === page,
                    })}
                    action
                    onClick={onSelectPage(item.code)}
                  >
                    <i className={`${item.icon} me-1`}></i>&nbsp;{item.label}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={9} lg={9}>
          {renderContent()}
        </Col>
      </Row>
    </>
  );
};

export default ViewPersonne;
