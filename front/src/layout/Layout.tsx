import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

// import "../../assets/styles/main.scss";

import "./Layout.scss";

export const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  return (
    <>
      {/* <Header handleShowSidebar={handleShowSidebar} showSidebar={showSidebar} /> */}
      <div className="container-fluid">
        <Sidebar
          showSidebar={showSidebar}
          handleCloseSidebar={handleCloseSidebar}
        />
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
