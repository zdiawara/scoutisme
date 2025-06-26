import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { LINKS } from "utils/links";
import { authApi } from "api/index";

export type UserData = {
  email: string;
  password: string;
};

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authApi.logout().then(() => {
      auth.setUser(undefined);
      navigate(LINKS.login, {
        replace: true,
      });
    });
  }, [auth, navigate]);

  return <>Deconnection ...</>;
};

export default Logout;
