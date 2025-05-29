import { useAuth } from "hooks";

import { useMemo } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { getMenuItems } from "utils";

import { ProfilDropdown } from "./profil/ProfilDropdown";

import "./HomePage.scss";

export const HomePage = () => {
  const { userDroit, user } = useAuth();

  const items = useMemo(() => {
    if (!userDroit) {
      return [];
    }
    return getMenuItems(userDroit, user);
  }, [userDroit, user]);

  return (
    <>
      {/* <Row className="mb-3"> */}
      <Col className="mx-auto" md={{ span: 10, offset: 0 }} sm={{ offset: 0, span: 0 }}>
        <Stack direction="horizontal" className="mt-4">
          <Button variant="default" className="d-block ms-auto bg-white me-2">
            <Icon.BellFill />
          </Button>
          <ProfilDropdown />
        </Stack>

        {/* <div className="my-4 text-center">
            <span className="fs-4 fw-light">Bienvenue</span>
            <span className="d-block fs-2 mt-2">
              {personne?.prenom} {personne?.nom}
            </span>
          </div> */}
        <Row className="g-3 my-3 ">
          <Col xs={6} sm="4">
            <Card as={Link} to={"/#"} className="mb-0 border">
              <Card.Body className="text-center">
                <Icon.BarChartLineFill color="#b49d84" size="3rem" />
                <div className="mt-2 fs-4 fw-light">Dashboard</div>
              </Card.Body>
            </Card>
          </Col>
          {items.map((menu) => (
            <Col key={menu.url} xs={6} sm="4">
              <Card as={Link} to={menu.url} className="mb-0 border">
                <Card.Body className="text-center">
                  <menu.Icon color="#b49d84" size="3rem" />
                  <div className="mt-2 fs-4 fw-light">{menu.label}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col xs={6} sm="4">
            <Card as={Link} to={"/parametres"} className="mb-0 border">
              <Card.Body className="text-center">
                <Icon.GearFill color="#b49d84" size="3rem" />
                <div className="mt-2 fs-4 fw-light">Paramètres</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
      {/* </Row> */}
    </>
  );
};
