import { FC, ReactNode, useMemo } from "react";
import { Badge, Card, Col, ListGroup, Nav, Row, Stack } from "react-bootstrap";
import { ICONS } from "pages/common";
import { useQuery } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";
import { PersonneBox } from "./PersonneBox";
import { View } from "components";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { LINKS } from "utils";
import classNames from "classnames";
import {
  PersonneCard,
  PersonneCotisations,
  PersonneDetails,
  PersonneFonctions,
} from ".";
import { useDroits } from "hooks/useDroits";
import * as Icon from "react-bootstrap-icons";

type PersonneProps = {
  personneId: string;
  header?: (personne: PersonneResource, page?: string) => ReactNode;
};

export const Personne: FC<PersonneProps> = ({ personneId, header }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("p") || "fiche";
  const protection = useDroits();
  const navigation = useNavigate();
  const location = useLocation();

  const menus = useMemo(() => {
    return [
      {
        label: "Profil",
        code: "fiche",
        Icon: Icon.PersonLinesFill,
        visible: true,
      },
      {
        label: "Carte",
        code: "carte",
        icon: "mdi mdi-card-account-details-outline",
        visible: true,
        Icon: Icon.PersonVcard,
      },
      {
        label: "Fonction",
        code: "fonctions",
        Icon: Icon.Briefcase,
        visible: true,
      },
      {
        label: "Cotisation",
        code: "cotisations",
        Icon: Icon.Bank2,
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

  const onSelectPage = (pageSelected: string) => () => {
    navigation(`${location.pathname}?p=${pageSelected}`, {
      replace: true,
    });
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
      {header && header(personne, page)}

      <Stack direction="horizontal">
        <div className="avatar-md">
          {personne.photo ? (
            <img
              src={personne.photo}
              className="rounded-circle avatar-md img-thumbnail"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                objectFit: "cover",
                color: "transparent",
                textIndent: "10000px",
              }}
            />
          ) : (
            <span className="avatar-title bg-secondary-lighten text-secondary font-20 rounded-circle">
              Photo
            </span>
          )}
        </div>
        <div className="ms-1">
          <span className="fw-bold fs-3">
            {personne.nom} {personne.prenom}
          </span>
          <div className="fw-light mt-1">{personne.fonction?.nom}</div>
        </div>
      </Stack>

      <div className="shadow-sm rounded p-2 bg-white mt-3 mb-2">
        <Row className="g-3">
          <Col xs={6}>
            <View.Item label="Numero scout">{personne.code}</View.Item>
          </Col>
          <Col xs={6}>
            <View.Item label="Fonction">{personne.fonction?.nom}</View.Item>
          </Col>
          <Col xs={12}>
            <View.Item label="Organisation">
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
                      <span className="fw-light" key={parent.id}>
                        {parent.nom}
                        &nbsp;/&nbsp;
                      </span>
                    ))}
                  <Link
                    to={LINKS.organisations.view(personne.organisation.id)}
                    className="text-decoration-underline text-black"
                  >
                    {personne.organisation.nom}
                  </Link>
                </>
              ) : null}
            </View.Item>
          </Col>
        </Row>
      </div>

      <Row className="g-2">
        <Col xs={12} sm={3}>
          <Nav
            variant="pills"
            style={{ overflow: "scroll" }}
            className="border-bottom flex-nowrap py-1 flex-sm-column"
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
        </Col>
        <Col xs={12} sm={9}>
          {renderContent()}
        </Col>
      </Row>
    </>
  );
};
