import { Col, Nav, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { FC, useState } from "react";

import { CotisationScoutUnite, EffectifScoutUnite } from "./personnes/scouts";

enum Page {
  effectif,
  cotisation,
}

const menus = [
  {
    label: "Effectifs",
    code: Page.effectif,
    Icon: Icon.PeopleFill,
  },
  {
    label: "Cotisations",
    code: Page.cotisation,
    Icon: Icon.Bank2, //
  },
];

const StatPourUnite: FC<{ uniteId: string }> = ({ uniteId }) => {
  const [page, setPage] = useState<Page>(Page.effectif);

  const onSelectPage = (pageSelected: Page) => () => {
    setPage(pageSelected);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <Nav variant="pills" style={{ overflow: "auto" }} className="flex-nowrap">
            {menus.map((item) => (
              <Nav.Item key={item.code}>
                <Nav.Link
                  active={item.code === page}
                  as="button"
                  onClick={onSelectPage(item.code)}
                  className="d-flex align-items-center d-block"
                >
                  <item.Icon size="1rem" className="me-1" />
                  <span>{item.label}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      </Row>

      {page === Page.cotisation && <CotisationScoutUnite uniteId={uniteId} />}
      {page === Page.effectif && <EffectifScoutUnite uniteId={uniteId} />}
    </>
  );
};

export default StatPourUnite;
