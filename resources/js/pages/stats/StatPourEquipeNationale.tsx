import { Col, Nav, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import OrganisationDashBord from "./organisations/OrganisationDashBord";
import { useState } from "react";
import PersonneDashbord from "./personnes/ScoutDashbord";
import CotisationDashbord from "./cotisations/CotisationDashBoard";

enum Page {
  organisation,
  effectif,
  cotisation,
}

const menus = [
  {
    label: "Organisations",
    code: Page.organisation,
    Icon: Icon.Building,
  },
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

const StatPourEquipeNationale = () => {
  const [page, setPage] = useState<Page>(Page.organisation);

  const onSelectPage = (pageSelected: Page) => () => {
    setPage(pageSelected);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <Nav variant="pills" style={{ overflow: "auto" }} className="flex-nowrap my-4">
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
      {Page.organisation === page && <OrganisationDashBord />}
      {Page.effectif === page && <PersonneDashbord />}
      {Page.cotisation === page && <CotisationDashbord />}
    </>
  );
};

export default StatPourEquipeNationale;
