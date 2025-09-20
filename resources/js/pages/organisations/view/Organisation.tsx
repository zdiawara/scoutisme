import { FC, useMemo } from "react";
import { Badge, Col, ListGroup, Nav, Row } from "react-bootstrap";
import { ICONS } from "pages/common";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
// import { useDroits } from "hooks/useDroits";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { DetailOrganisation } from "../consultation/details";
import { OrganisationDirection } from "../consultation/direction";
import { SousOrganisation } from "../consultation/sousOrganisations";
import { ListOrganisationScout } from "../consultation/scouts";
import { Header } from "layout/Header";

type OrganisationProps = {
  organisationId: string;
};

export const Organisation: FC<OrganisationProps> = ({ organisationId }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("p") || "details";
  // const protection = useDroits();
  const navigation = useNavigate();
  const location = useLocation();

  const { data: organisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, organisationId],
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return organisationApi.findById<OrganisationResource>(queryKey[1] as string);
    },
  });

  const menus = useMemo(() => {
    if (!organisation) {
      return [];
    }

    const { nature, type } = organisation;

    const TABS = [
      {
        label: "Détails",
        code: "details",
        Icon: Icon.FileEarmarkText,
        visible: true,
      },
      {
        label: "Direction",
        code: "direction",
        icon: ICONS.direction,
        visible: true,
        Icon: Icon.People,
      },
      {
        label:
          nature.code === NATURE.region
            ? "Unités/Groupes"
            : nature.code === NATURE.groupe
            ? "Unités"
            : nature.code === NATURE.national && type?.code === "equipe_nationale"
            ? "Régions"
            : "Equipe nationale",
        code: "organisations",
        icon: ICONS.organisation,
        visible: true,
        Icon: Icon.Building,
      },
      {
        label: "Scouts",
        code: "scouts",
        icon: ICONS.personne,
        visible: true, //Object.values(protection.personne.scouts).some((e) => e),
        Icon: Icon.Person,
      },
    ];

    return TABS.filter((e) => e.visible).filter((item) => {
      if (organisation.nature.code !== NATURE.unite) {
        return item.code !== "scouts";
      }
      if (organisation.nature.code === NATURE.unite) {
        return item.code !== "organisations";
      }
      return true;
    });
  }, [organisation]);

  const onSelectPage = (pageSelected: string) => () => {
    navigation(`${location.pathname}?p=${pageSelected}`, {
      replace: true,
    });
  };

  const renderContent = () => {
    if (!organisation) {
      return null;
    }
    switch (page) {
      case "direction":
        return <OrganisationDirection organisation={organisation} />;
      case "scouts":
        return <ListOrganisationScout organisation={organisation} />;
      case "organisations":
        return <SousOrganisation organisation={organisation} />;
      default:
        return <DetailOrganisation organisation={organisation} />;
    }
  };

  const getRegion = () => {
    if (!organisation) {
      return null;
    }
    return organisation.parents?.find((p) => p.nature === NATURE.region);
  };

  if (isLoading || !organisation) {
    return <span>chargement ...</span>;
  }

  const region = getRegion();

  return (
    <>
      <Header title="Consulter" />

      <ListGroup className="mb-2 mt-4">
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Nom">{organisation.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Nature">
                <Badge bg="secondary">{organisation.nature.nom}</Badge>
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="g-3">
            {region && (
              <Col xs={6}>
                <View.Item label="Region">
                  <Link to={LINKS.organisations.view(region.id)} className="text-decoration-underline text-black">
                    {region.nom}
                  </Link>
                </View.Item>
              </Col>
            )}
            {organisation.parent && (!region || region.id !== organisation?.parent?.id) ? (
              <Col xs={6}>
                <View.Item label="Parent">
                  <Link
                    to={LINKS.organisations.view(organisation.parent.id)}
                    className="text-decoration-underline text-black"
                  >
                    {organisation.parent.nom}
                  </Link>
                </View.Item>
              </Col>
            ) : null}
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <Nav variant="pills" style={{ overflow: "auto" }} className="flex-nowrap py-2 mb-2" defaultActiveKey="/home">
        {menus.map((item) => (
          <Nav.Item key={item.code}>
            <Nav.Link
              active={item.code === page}
              onClick={onSelectPage(item.code)}
              href="#"
              className="d-flex align-items-center"
            >
              <item.Icon size="1.1rem" className="me-1" />
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {renderContent()}
    </>
  );
};
