import { useAuth } from "hooks";
import { Header } from "layout/Header";
import { useMemo } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { NATURE } from "utils/constants";

export const HomePage = () => {
  const { user } = useAuth();
  const personne = user?.personne;

  const items = useMemo(() => {
    const nature = personne?.organisation?.nature?.code;

    return [
      // {
      //   title: "Dashboard",
      //   Icon: Icon.BarChartLineFill,
      //   url: LINKS.dashbords.organisations,
      // },
      {
        title: "Mon profil",
        Icon: Icon.PersonBadge,
        url: LINKS.profil.base,
      },

      {
        title:
          nature === NATURE.unite
            ? "Mon unité"
            : nature === NATURE.groupe
            ? "Mon groupe"
            : nature === NATURE.region
            ? "Ma région"
            : "Eq. Nationale",
        Icon: Icon.Building,
        url: LINKS.organisation.base,
      },

      {
        title: "Personnes",
        Icon: Icon.PeopleFill,
        url: "/personnes",
      },

      {
        title: "Mails",
        Icon: Icon.SendFill,
        url: "/messages",
      },

      {
        title: "Paiements",
        Icon: Icon.CurrencyDollar,
        url: "/paiements",
      },
    ];
  }, [personne?.organisation?.nature?.code]);
  return (
    <Container className="mt-0">
      <Header showBack={false} />
      <Row className="mb-3">
        <Col md={{ span: 10, offset: 1 }} sm={{ offset: 0, span: 0 }}>
          <div className="my-4 text-center">
            <span className="fs-4 fw-light">Bienvenue</span>
            <span className="d-block fs-2 mt-2">
              {personne?.prenom} {personne?.nom}
            </span>
          </div>
          <Row className="g-3">
            {items.map((menu) => (
              <Col key={menu.url} xs={6} sm="4">
                <Card as={Link} to={menu.url} className="mb-0 border">
                  <Card.Body className="text-center">
                    <menu.Icon color="#b49d84" size="3rem" />
                    <div className="mt-2 fs-4 fw-light">{menu.title}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
