import { Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Sidebar } from "./sidbar";
import { Header } from "./header";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "api";

export const Layout = () => {
  const query = useQuery({
    queryKey: ["ok"],
    cacheTime: 0,
    retry: 0,
    queryFn: () => {
      return userApi.userInfo();
    },
  });

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }
  if (query.isError) {
    return <Navigate to="login" />;
  }
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
