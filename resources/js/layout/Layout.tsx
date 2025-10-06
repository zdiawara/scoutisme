import { Navigate, Outlet } from "react-router-dom";

// import "../../assets/styles/main.scss";
import * as Icon from "react-bootstrap-icons";

// import "./Layout.scss";
import { authApi } from "api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks";
import { Alert, Button, Container, Stack } from "react-bootstrap";
import { LINKS } from "utils/links";
import { ProfilDropdown } from "pages/home/profil/ProfilDropdown";

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

  const user = query.data.data;

  const renderContent = () => {
    if (!user.verify) {
      return (
        <Alert className="mt-5" variant="danger">
          <Alert.Heading>Problème de vérification</Alert.Heading>
          <p>Votre adresse mail n'est pas vérifiée.</p>
          <p className="mb-0">
            <strong>Merci de contacter l'administrateur.</strong>
          </p>
        </Alert>
      );
    }
    const isAdmin = user.roles?.some((e) => e.code === "admin");
    if ((!user.personne?.fonction || !user.personne?.organisation) && !isAdmin) {
      return (
        <Alert className="mt-5" variant="danger">
          <Alert.Heading>Problème d'accès</Alert.Heading>
          <p>Vous devez occuper une fonction au sein de l'ASBF pour accèder à cette application.</p>
          <p className="mb-0">
            <strong>Merci de contacter l'administrateur.</strong>
          </p>
        </Alert>
      );
    }
    if (!user.roles.length) {
      return (
        <Alert className="mt-5" variant="danger">
          <Alert.Heading>Problème d'accès</Alert.Heading>
          <p>Aucun rôle utilisateur n'a été associé à la fonction {user.personne?.fonction?.nom}</p>
          <p className="mb-0">
            <strong>Merci de contacter l'administrateur.</strong>
          </p>
        </Alert>
      );
    }
    return <Outlet />;
  };

  return (
    <>
      <Stack direction="horizontal" className="p-2 bg-white shadow-sm">
        <Button variant="default" className="d-block ms-auto bg-white me-2">
          <Icon.BellFill />
        </Button>
        <ProfilDropdown />
      </Stack>
      <Container>{renderContent()}</Container>
    </>
  );
};
