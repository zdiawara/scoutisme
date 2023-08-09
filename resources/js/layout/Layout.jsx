import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Sidebar } from "./sidbar";

export const Layout = () => {
  return (
    <>
      <div className="wrapper">
        <Sidebar />

        <div className="content-page">
          <div className="content">
            {/* <Topbar openLeftMenuCallBack={openMenu} hideLogo={true} /> */}

            <Container fluid>
              <Outlet />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
