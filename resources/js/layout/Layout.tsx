import { Navigate, Outlet } from "react-router-dom";

// import "../../assets/styles/main.scss";

// import "./Layout.scss";
import { authApi } from "api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks";
import { Container } from "react-bootstrap";
import { LINKS } from "utils/links";

export const Layout = () => {
  const { setUser } = useAuth();

  const query = useQuery({
    queryKey: ["user-info"],
    cacheTime: 0,
    retry: 0,
    queryFn: async () => {
      await authApi.getCsrfCookie();
      const s = await authApi.userInfo();
      setUser(s.data);
      return s;
    },
  });

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError || !query.data) {
    setUser(undefined);
    return <Navigate to={LINKS.login} />;
  }

  return (
    <Container>
      {/* <Sidebar showSidebar={showSidebar} handleCloseSidebar={handleCloseSidebar} /> */}
      {/* <Row>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> */}
      <Outlet />
      {/* </main>
      </Row> */}
    </Container>
  );
};
