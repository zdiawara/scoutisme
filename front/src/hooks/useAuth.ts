import { AuthContent } from "context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContent);
};
