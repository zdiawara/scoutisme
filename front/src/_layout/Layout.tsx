import { Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Sidebar } from "./sidbar";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "api";
import { useAuth } from "hooks";

export const Layout = () => {
  const { setUser } = useAuth();
  const query = useQuery({
    queryKey: ["user-info"],
    cacheTime: 0,
    retry: 0,
    queryFn: async () => {
      const s = await authApi.userInfo();
      setUser(s.data);
      return s;
    },
  });

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError) {
    setUser(undefined);
    return <Navigate to="login" />;
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content-page">
        <div>
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "10px",
            }}
            className="mt-3 shadow-sm"
          >
            Personnes
          </div>
          {/* <Header /> */}
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};
