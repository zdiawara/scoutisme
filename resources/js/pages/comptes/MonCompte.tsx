import { useAuth } from "hooks/useAuth";
import { Header } from "layout/Header";
import { Utilisateur } from "pages/parametres/utilisateurs/view";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { DropOption } from "components/options";
import { useState } from "react";

const MENU = [
  {
    label: "Mot de passe",
    description: "Modification mon mot de passe",
    code: "mot_de_passe",
    Icon: Icon.LockFill,
  },
];

const MonCompte = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [, setAction] = useState<string | undefined>();

  const onSelect = (code: string) => {
    if (code === "mot_de_passe") {
      navigate("/update-password");
    } else {
      setAction(code);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header
        title="Mon compte"
        right={<DropOption actions={MENU} onSelect={onSelect} menu={false} variant="secondary" />}
      />
      <Utilisateur user={user} />
    </>
  );
};

export default MonCompte;
