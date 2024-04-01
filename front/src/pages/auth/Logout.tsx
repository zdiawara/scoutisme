import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks";
import { useEffect } from "react";

export type UserData = {
  email: string;
  password: string;
};

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("@token");
    auth.setUser(undefined);
    navigate("/login", {
      replace: true,
    });
  }, [auth, navigate]);

  return <>Deconnection ...</>;
};

export default Logout;
