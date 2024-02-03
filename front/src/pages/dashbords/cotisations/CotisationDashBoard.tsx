import classNames from "classnames";
import { useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { ScoutCotisation } from "./scouts";

const TABS = [
  {
    label: "Scout",
    code: "scouts",
    description: "Cotisation des scouts par région",
  },
  {
    label: "Adulte",
    code: "adultes",
    description: "Etat de cotisations des adultes",
  },
];

const CotisationDashbord = () => {
  const [page, setPage] = useState<string>("scouts");

  const renderContent = () => {
    switch (page) {
      case "scouts":
        return <ScoutCotisation />;
      default:
        return null;
    }
  };

  return (
    <Row className="mt-3">
      <Col xs={3}>
        <Card>
          <Card.Header className="bg-light fw-bold text-dark shadow-sm">
            Cotisation par région
          </Card.Header>
          <Card.Body className="p-1">
            <ListGroup defaultActiveKey="#link1">
              {TABS.map((item) => (
                <ListGroup.Item
                  key={item.code}
                  className={classNames("border-0 rounded", {
                    active: item.code === page,
                  })}
                  action
                  onClick={() => setPage(item.code)}
                >
                  <span className="fw-bold">{item.label}</span>
                  <div className="text-muted">{item.description}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={9}>{renderContent()}</Col>
    </Row>
  );
};

export default CotisationDashbord;
