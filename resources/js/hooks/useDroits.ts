import { useMemo } from "react";
import { useAuth } from "./useAuth";
import {
  CotisationProtection,
  MailProtection,
  OrganisationProtection,
  PersonneProtection,
} from "protections";

export const useDroits = () => {
  const { userDroit } = useAuth();

  const personne = useMemo(
    () => new PersonneProtection(userDroit!),
    [userDroit]
  );

  const cotisation = useMemo(
    () => new CotisationProtection(userDroit!),
    [userDroit]
  );

  const organisation = useMemo(
    () => new OrganisationProtection(userDroit!),
    [userDroit]
  );

  const mail = useMemo(() => new MailProtection(userDroit!), [userDroit]);

  return {
    personne,
    cotisation,
    organisation,
    mail,
  };
};
