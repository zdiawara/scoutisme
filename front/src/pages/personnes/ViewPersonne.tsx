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
import { ViewPersonneActions } from "./common/ViewPersonneActions";

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
  const personneId = useParams().id!;
  const [page, setPage] = useState<string>("fiche");

  const { data: personne, isLoading } = useQuery({
    queryKey: [QUERY_KEY.personnes, personneId],
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return personneApi.findById<PersonneResource>(queryKey[1] as string);
    },
  });

  const { data: attribution } = useQuery({
    queryKey: [QUERY_KEY.attribution_active, personneId],
    networkMode: "offlineFirst",
    queryFn: async ({ queryKey }) => {
      const { data } = await attributionApi.findAll<AttributionResource>({
        personneId,
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
      <div className="ms-auto d-flex align-items-center">
        <Link
          className="rounded-corner btn btn-primary"
          to={LINKS.personnes.edit(personne.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>
        <ViewPersonneActions personne={personne} />
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
        return <PersonneFonctions personneId={personneId} />;
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
