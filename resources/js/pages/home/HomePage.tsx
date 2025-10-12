import { useAuth } from "hooks";

import { useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { getMenuItems, LINKS } from "utils";

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
    <Row className="g-3 my-3 ">
      <Col xs={6} sm="4">
        <Card as={Link} to={LINKS.dashbords.base} className="mb-0 border">
          <Card.Body className="text-center">
            <Icon.BarChartLineFill color="#b49d84" size="3rem" />
            <div className="mt-2 fs-4 fw-light">Statistiques</div>
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
      {userDroit?.isAdmin && (
        <Col xs={6} sm="4">
          <Card as={Link} to={"/parametres"} className="mb-0 border">
            <Card.Body className="text-center">
              <Icon.GearFill color="#b49d84" size="3rem" />
              <div className="mt-2 fs-4 fw-light">Paramètres</div>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
};
