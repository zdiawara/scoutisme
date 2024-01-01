import { Navigate, Outlet } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { Sidebar } from "./sidbar";
import { Header } from "./header";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "api";
import { useAuth } from "hooks";
import { useMemo } from "react";

export const Layout = () => {
  const { setUser, user } = useAuth();
  const query = useQuery({
    queryKey: ["user-info"],
    cacheTime: 0,
    retry: 0,
    queryFn: () => {
      return authApi.userInfo().then((s) => {
        setUser(s.data);
        return s;
      });
    },
  });
  /*   const d = useMemo(()=>{
    user?.fonctionnalites.reduce((prev, curr)=>{

      return prev;
    }, [] as Array<{nom : string}>)
    console.log(user);
  },[]) */

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
        <div className="content">
          <Header />
          <Container fluid>
            {/* <Card body className="mt-3">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Col1</td>
                    <td>Col2</td>
                    <td>Action</td>
                    <td>Description</td>
                  </tr>
                </tbody>
              </table>
            </Card> */}
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};
