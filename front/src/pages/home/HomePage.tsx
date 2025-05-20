import classNames from "classnames";
import { useAuth } from "hooks";

import { useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Row,
  Stack,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { NATURE } from "utils/constants";
import d from "../../assets/images/users/avatar-1.jpg";
import "./HomePage.scss";

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
      <Row className="mb-3">
        <Col md={{ span: 10, offset: 1 }} sm={{ offset: 0, span: 0 }}>
          <Stack direction="horizontal" className="mt-4">
            <Dropdown
              className="dropdown-profile"
              show={false}
              onToggle={() => {}}
            >
              <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                as={Link}
                to="#"
                onClick={() => {}}
                className="nav-link dropdown-toggle nav-user arrow-none me-0 d-flex"
              >
                <div className="account-user-avatar">
                  <img src={d} className="rounded-circle" alt="user" />
                </div>
                <div className="mx-1">
                  <span className="account-user-name">Zakaridia Diawara</span>
                  <span className="account-position fw-light">
                    Chef d'unité
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                align={"end"}
                className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
              >
                <div onClick={() => {}}>
                  <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome !</h6>
                  </div>
                  {[{ redirectTo: "es", icon: "", label: "OK" }].map(
                    (item, i) => {
                      return (
                        <Link
                          to={item.redirectTo}
                          className="dropdown-item notify-item"
                          key={i + "-profile-menu"}
                        >
                          <i className={classNames(item.icon, "me-1")}></i>
                          <span>{item.label}</span>
                        </Link>
                      );
                    }
                  )}
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="default" className="d-block ms-auto bg-white me-1">
              <Icon.BellFill />
            </Button>
          </Stack>

          {/* <div className="my-4 text-center">
            <span className="fs-4 fw-light">Bienvenue</span>
            <span className="d-block fs-2 mt-2">
              {personne?.prenom} {personne?.nom}
            </span>
          </div> */}
          <Row className="g-3 my-3 ">
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
