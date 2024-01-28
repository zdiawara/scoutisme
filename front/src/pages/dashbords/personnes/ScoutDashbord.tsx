import classNames from "classnames";
import { useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { ScoutCotisationByRegion, ScoutEffectifByRegion } from "./scouts";

const TABS = [
  {
    label: "Effectif",
    code: "scout_effectif_by_region",
    description: "Repartition des scouts par région",
  },
  {
    label: "Cotisation",
    code: "scout_cotisation_by_region",
    description: "Etat de cotisations des scouts",
  },
  {
    label: "Genre",
    code: "scout_genre_by_region",
    description: "Nombre de scouts par genre",
  },
];

const PersonneDashbord = () => {
  const [page, setPage] = useState<string>("scout_effectif_by_region");

  const renderContent = () => {
    switch (page) {
      case "scout_cotisation_by_region":
        return <ScoutCotisationByRegion />;
      default:
        return <ScoutEffectifByRegion />;
    }
  };

  return (
    <Row className="mt-3">
      <Col xs={3}>
        <Card>
          <Card.Header className="bg-light fw-bold text-dark shadow-sm">
            SCOUTS
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

export default PersonneDashbord;
