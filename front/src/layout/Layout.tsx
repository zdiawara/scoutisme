import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Sidebar } from "./sidbar";
import { Header } from "./header";

export const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content-page">
        <div className="content">
          <Header />
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};
