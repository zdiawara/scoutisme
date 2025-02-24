import { FC } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { List, Search } from "react-bootstrap-icons";

type HeaderProps = {
  handleShowSidebar: () => void;
  showSidebar: boolean;
};

export const Header: FC<HeaderProps> = ({ handleShowSidebar, showSidebar }) => {
  return (
    <>
      {/* <header className="navbar sticky-top bg-light flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          Formation
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Rechercher ..."
          aria-label="Search"
        />
      </header> */}

      <Navbar
        bg="primary"
        // variant="primary"
        expand="md"
        className="sticky-top p-0 shadow"
        data-bs-theme="light" // While React Bootstrap handles theme, this prop might be for underlying Bootstrap JS
      >
        <Navbar.Brand
          className="col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
          href="#"
        >
          Formation
        </Navbar.Brand>
        <Nav className="flex-row d-md-none">
          <Nav.Item className="text-nowrap">
            <Button
              variant="link"
              className="nav-link px-3 text-white"
              type="button"
              data-bs-toggle="collapse" // React Bootstrap handles collapse differently
              data-bs-target="#navbarSearch" // We'll manage this with state if needed for more React control
              aria-controls="navbarSearch"
              aria-expanded="false"
              aria-label="Toggle search"
            >
              <Search className="bi" aria-hidden="true" />
            </Button>
          </Nav.Item>
          <Nav.Item className="text-nowrap">
            <Button
              variant="link"
              className="nav-link px-3 text-white"
              type="button"
              onClick={handleShowSidebar}
              aria-controls="sidebarMenu"
              aria-expanded={showSidebar ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <List className="bi" aria-hidden="true" />
            </Button>
          </Nav.Item>
        </Nav>
        {/* <div id="navbarSearch" className="navbar-search w-100 collapse">
          <FormControl
            type="text"
            placeholder="Search"
            className="w-100 rounded-0 border-0"
            aria-label="Search"
          />
        </div> */}
      </Navbar>
    </>
  );
};
