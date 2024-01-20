import { FC, useMemo, useState } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { ICONS, PageHeader } from "pages/common";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";
import { PersonneBox } from "./view/PersonneBox";
import { View } from "components";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import classNames from "classnames";
import {
  PersonneCard,
  PersonneCotisations,
  PersonneDetails,
  PersonneFonctions,
} from "./view";
import { useDroits } from "hooks/useDroits";

const ViewPersonne: FC = () => {
  const personneId = useParams().id!;
  const [page, setPage] = useState<string>("fiche");
  const protection = useDroits();

  const menus = useMemo(() => {
    return [
      {
        label: "Informations",
        code: "fiche",
        icon: "uil uil-bookmark",
        visible: true,
      },
      {
        label: "Carte membre",
        code: "carte",
        icon: "mdi mdi-card-account-details-outline",
        visible: true,
      },
      {
        label: "Fonctions",
        code: "fonctions",
        icon: ICONS.fonction,
        visible: true,
      },
      {
        label: "Cotisations",
        code: "cotisations",
        icon: ICONS.cotisation,
        visible: protection.cotisation.acces,
      },
    ].filter((e) => e.visible);
  }, [protection.cotisation.acces]);

  const { data: personne, isLoading } = useQuery({
    queryKey: [QUERY_KEY.personnes, personneId],
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return personneApi.findById<PersonneResource>(queryKey[1] as string);
    },
  });

  const actions = () => {
    if (
      !personne ||
      !protection.personne.modifier(personne) ||
      page !== "fiche"
    ) {
      return null;
    }
    return (
      <div className="ms-auto d-flex align-items-center">
        <Link
          className="rounded-corner btn btn-danger"
          to={LINKS.personnes.edit(personne.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>
        {/* <ViewPersonneActions personne={personne} /> */}
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
        return <PersonneCard personne={personne} />;
      case "fonctions":
        return <PersonneFonctions personne={personne} />;
      case "cotisations":
        return <PersonneCotisations personne={personne} />;
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
              <View.Item>{personne.fonction?.nom}</View.Item>
              <hr />
              <div className="font-13">
                <i className={`${ICONS.organisation} me-1`}></i>
                Organisation
              </div>
              <View.Item>
                {personne?.organisation ? (
                  <>
                    {personne.organisation.parents
                      ?.filter((parent) =>
                        [NATURE.unite, NATURE.groupe].includes(
                          personne.organisation?.nature?.code!
                        )
                          ? NATURE.national !== parent.nature
                          : true
                      )
                      ?.map((parent) => (
                        <span className="text-muted" key={parent.id}>
                          {parent.nom}
                          &nbsp;/&nbsp;
                        </span>
                      ))}
                    <Link
                      to={LINKS.organisations.view(personne.organisation.id)}
                      className="text-decoration-underline"
                    >
                      {personne.organisation.nom}
                    </Link>
                  </>
                ) : null}
              </View.Item>
            </div>
          </PersonneBox>

          <Card>
            <Card.Body className="p-2">
              <ListGroup defaultActiveKey="#link1">
                {menus.map((item) => (
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
