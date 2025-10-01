import { Col, Nav, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import OrganisationDashBord from "./organisations/OrganisationDashBord";
import { Header } from "layout/Header";

const menus = [
  {
    label: "Organisations",
    code: "organisation",
    Icon: Icon.Building,
  },
  {
    label: "Effectifs",
    code: "effectif",
    Icon: Icon.PeopleFill,
  },
  {
    label: "Cotisations",
    code: "cotisation",
    Icon: Icon.Bank2, //
  },
];

const StatEquipeNationale = () => {
  const page = "organisation";

  return (
    <>
      <Header title="Statistiques" />

      <Row>
        <Col xs={12}>
          <Nav variant="pills" style={{ overflow: "auto" }} className="flex-nowrap my-4">
            {menus.map((item) => (
              <Nav.Item key={item.code}>
                <Nav.Link
                  active={item.code === page}
                  // onClick={onSelectPage(item.code)}
                  href="#"
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

      <OrganisationDashBord />
    </>
  );
};

export default StatEquipeNationale;
