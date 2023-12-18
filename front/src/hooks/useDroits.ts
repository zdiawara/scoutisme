import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { PersonneScreen } from "utils/PersonneScreen";

export const useDroits = () => {
  const { userDroit } = useAuth();

  const personne = useMemo(() => new PersonneScreen(userDroit!), [userDroit]);

  return {
    personne,
  };
};
