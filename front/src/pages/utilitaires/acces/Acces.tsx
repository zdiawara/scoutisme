import classNames from "classnames";
import { ICONS, PageHeader } from "pages/common";
import { useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { ListUser } from "./ListUser";
import { ListRole } from "./ListRole";

const TABS = [
  { label: "Utilisateurs", code: "users", icon: ICONS.personne },
  { label: "Roles", code: "roles", icon: ICONS.organisation },
];

export const Acces = () => {
  const [page, setPage] = useState<string>("users");

  const onSelectPage = (pageSelected: string) => () => {
    setPage(pageSelected);
  };

  const renderContent = () => {
    switch (page) {
      case "roles":
        return <ListRole />;
      default:
        return <ListUser />;
    }
  };

  return (
    <>
      <PageHeader.List
        title="Gestion des accès"
        subtitle="Gérer les utilisateurs, rôles et accès aux fonctionnalités"
        className="my-4"
      />
      <Row>
        <Col xl={3} lg={3}>
          <Card className="text-black">
            <Card.Body className="p-1">
              <ListGroup defaultActiveKey="#link1">
                {TABS.map((item) => (
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
