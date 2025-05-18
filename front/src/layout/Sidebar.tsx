// import FeatherIcon, { FeatherIconName } from "feather-icons-react";
import { Button, Col, Nav, Offcanvas } from "react-bootstrap";

import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { getMenuItems } from "utils";
import * as Icon from "react-bootstrap-icons";

type SidebarProps = {
  showSidebar: boolean;
  handleCloseSidebar: () => void;
};

const NAV: Record<string, ReactNode> = {
  personnes: <Icon.PeopleFill size="1.25rem" className="me-1" />,
  organisations: <Icon.BuildingFill size="1.25rem" className="me-1" />,
  paiements: <Icon.Bank2 size="1.25rem" className="me-1" />,
  mails: <Icon.EnvelopeFill size="1.25rem" className="me-1" />,
};

export const Sidebar: FC<SidebarProps> = ({
  showSidebar,
  handleCloseSidebar,
}) => {
  const content = (
    <Nav className="flex-column">
      {getMenuItems()
        .filter((item) => item.url)
        .map((nav) => (
          <Nav.Item
            key={nav.url}
            className="nav-item"
            onClick={handleCloseSidebar}
          >
            <Link
              className="nav-link text-white d-flex align-items-center py-2"
              aria-current="page"
              to={nav.url!}
              // style={{ lineHeight: "2", verticalAlign: "middle" }}
            >
              {nav.key && NAV[nav.key]}
              {nav.label}
            </Link>
          </Nav.Item>
        ))}
    </Nav>
  );

  if (!showSidebar) {
    return (
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-primary text-white sidebar collapse"
        // style={{ color: "white !important" }}
      >
        <div className="position-sticky pt-0">{content}</div>
      </nav>
    );
  }
  return (
    <>
      <Col md={3} lg={2} className="d-md-block sidebar collapse">
        <Offcanvas
          show={showSidebar}
          onHide={handleCloseSidebar}
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
          className="offcanvas-md offcanvas-start"
        >
          <Offcanvas.Header>
            <Offcanvas.Title id="sidebarMenuLabel">
              Company name
            </Offcanvas.Title>
            <Button
              variant="close"
              onClick={handleCloseSidebar}
              aria-label="Close"
            />
          </Offcanvas.Header>
          <Offcanvas.Body className="d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            {content}
          </Offcanvas.Body>
        </Offcanvas>
      </Col>
    </>
  );
};
