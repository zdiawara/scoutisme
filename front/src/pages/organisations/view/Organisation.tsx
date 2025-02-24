import { FC, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  Nav,
  Row,
  Stack,
} from "react-bootstrap";
import { ICONS, PageHeader } from "pages/common";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import * as Icon from "react-bootstrap-icons";
import { View } from "components";

type OrganisationProps = {
  organisationId: string;
  showBackBtn?: boolean;
};
export const Organisation: FC<OrganisationProps> = ({
  organisationId,
  showBackBtn,
}) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("p") || "details";
  const protection = useDroits();
  const navigation = useNavigate();
  const location = useLocation();

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
        Icon: Icon.FileEarmarkText,
      },
      {
        label: "Sous orga.",
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
  }, [organisation, protection.personne.scouts]);

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
        return <OrganisationMembres organisation={organisation} />;
      case "scouts":
        return <OrganisationScouts organisation={organisation} />;
      case "organisations":
        return <SousOrganisation organisation={organisation} />;
      default:
        return <DetailOrganisation organisation={organisation} />;
    }
  };

  if (isLoading || !organisation) {
    return <span>chargement ...</span>;
  }

  const renderActions = () => {
    if (!organisation || !protection.organisation.creer || page !== "fiche") {
      return null;
    }

    return (
      <Link
        className="rounded-corner btn btn-danger"
        to={LINKS.organisations.edit(organisation.id)}
      >
        <i className="uil-edit-alt"></i>
        <span className="d-none d-sm-inline">Modifier</span>
      </Link>
    );
  };

  return (
    <>
      <PageHeader.View
        // title={organisation.nom}
        right={renderActions()}
        className="my-4"
        showBackBtn={showBackBtn}
      />

      <div className="shadow-sm rounded p-2 bg-white mt-3 mb-2">
        <Row className="g-3">
          <Col xs={6}>
            <View.Item label="Nom">{organisation.nom}</View.Item>
          </Col>
          <Col xs={6}>
            <View.Item label="Nature">
              <Badge bg="secondary">{organisation.nature.nom}</Badge>
            </View.Item>
          </Col>
          <Col>
            <View.Item label="Parent">
              {organisation.parent ? (
                <Link
                  to={LINKS.organisations.view(organisation.parent.id)}
                  className="text-decoration-underline text-black"
                >
                  {organisation.parent.nom}
                </Link>
              ) : null}
            </View.Item>
          </Col>
        </Row>
      </div>

      <Nav
        variant="pills"
        style={{ overflow: "scroll" }}
        className="flex-nowrap border-bottom py-1 mb-2"
        defaultActiveKey="/home"
      >
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
