import { FC, useEffect, useMemo, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { ICONS, PageHeader } from "pages/common";
import { Link } from "react-router-dom";
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
} from "../view";
import classNames from "classnames";
import { useDroits } from "hooks/useDroits";

type OrganisationProps = {
  organisationId: string;
  showBackBtn?: boolean;
};
export const Organisation: FC<OrganisationProps> = ({
  organisationId,
  showBackBtn,
}) => {
  const [page, setPage] = useState<string>("fiche");
  const protection = useDroits();

  const { data: organisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, organisationId],
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return organisationApi.findById<OrganisationResource>(
        queryKey[1] as string
      );
    },
  });

  const menus = useMemo(() => {
    if (!organisation) {
      return [];
    }

    const TABS = [
      { label: "Détails", code: "fiche", icon: ICONS.detail, visible: true },
      {
        label: "Direction",
        code: "direction",
        icon: ICONS.direction,
        visible: true,
      },
      {
        label: "Scouts",
        code: "scouts",
        icon: ICONS.personne,
        visible: Object.values(protection.personne.scouts).some((e) => e),
      },
    ];

    console.log(protection.personne.scouts);

    return TABS.filter((e) => e.visible).filter((item) => {
      if (organisation.nature.code !== NATURE.unite) {
        return item.code !== "scouts";
      }
      if (organisation.nature.code === NATURE.unite) {
        return item.code !== "sous_organisation";
      }
      return true;
    });
  }, [organisation, protection.personne.scouts]);

  useEffect(() => {
    setPage("fiche");
  }, [organisationId]);

  const onSelectPage = (pageSelected: string) => () => {
    setPage(pageSelected);
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

  const actions = () => {
    if (!organisation || !protection.organisation.creer || page !== "fiche") {
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
      </div>
    );
  };

  return (
    <>
      <PageHeader.View
        title={organisation.nom}
        subtitle={`Code : ${organisation.code}`}
        right={actions()}
        className={"my-4"}
        showBackBtn={showBackBtn}
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
