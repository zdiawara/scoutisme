import { FC, useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { ICONS, PageHeader } from "pages/common";
import { Link, useParams } from "react-router-dom";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import {
  DetailOrganisation,
  Organigramme,
  OrganisationMembres,
  OrganisationScouts,
  SousOrganisation,
} from "./view";
import classNames from "classnames";

const TABS = [
  { label: "Détails", code: "fiche", icon: ICONS.detail },
  {
    label: "Direction",
    code: "direction",
    icon: ICONS.direction,
  },
  { label: "Scouts", code: "scouts", icon: ICONS.personne },
];

const ViewOrganisation: FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState<string>("fiche");

  const { data: organisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, id],
    queryFn: ({ queryKey }) => {
      return organisationApi.findById<OrganisationResource>(
        queryKey[1] as string
      );
    },
  });

  useEffect(() => {
    setPage("fiche");
  }, [id]);

  const onSelectPage = (pageSelected: string) => () => {
    setPage(pageSelected);
  };

  const actions = () => {
    if (!organisation) {
      return null;
    }

    return (
      <div className="ms-auto d-flex">
        <Link
          className="rounded-corner btn btn-primary"
          to={LINKS.organisations.edit(organisation.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>
      </div>
    );
  };

  const renderContent = () => {
    if (!organisation) {
      return null;
    }
    switch (page) {
      case "direction":
        return <OrganisationMembres organisation={organisation} />;
      case "scouts":
        return <OrganisationScouts organisation={organisation} />;
      default:
        return (
          <>
            <DetailOrganisation organisation={organisation} />
            {organisation.nature.code !== NATURE.unite && (
              <SousOrganisation organisation={organisation} />
            )}
          </>
        );
    }
  };

  if (isLoading || !organisation) {
    return <span>chargement ...</span>;
  }

  /*   const hasParent =
    organisation.parents?.length && organisation.parents?.length > 1; */

  return (
    <>
      {/* {hasParent && (
        <>
          <nav className="mb-0 fs-4">
            <ol className="breadcrumb">
              {organisation.parents?.map((parent) => (
                <li
                  key={parent.id}
                  className={classNames("breadcrumb-item", {
                    active: parent.id === organisation.id,
                  })}
                >
                  {parent.id === organisation.id ? (
                    parent.nom
                  ) : (
                    <Link to={LINKS.organisations.view(parent.id)}>
                      {parent.nom}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </>
      )} */}
      <PageHeader.View
        title={organisation.nom}
        subtitle={`Code : ${organisation.code}`}
        right={actions()}
        className={"my-4"}
      />
      <Row>
        <Col xl={3} lg={3}>
          <Card className="text-black mb-1">
            <Card.Body className="p-1">
              <Organigramme
                parents={organisation.parents}
                organisation={{
                  nature: organisation.nature.nom,
                  nom: organisation.nom,
                }}
              />
            </Card.Body>
          </Card>

          <Card className="text-black">
            <Card.Body className="p-1">
              <ListGroup defaultActiveKey="#link1">
                {TABS.filter((item) => {
                  if (organisation.nature.code !== NATURE.unite) {
                    return item.code !== "scouts";
                  }
                  return true;
                }).map((item) => (
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

export default ViewOrganisation;
