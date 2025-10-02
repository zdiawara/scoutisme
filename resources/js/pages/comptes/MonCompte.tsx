import { useAuth } from "hooks/useAuth";
import { Header } from "layout/Header";
import { Utilisateur } from "pages/parametres/utilisateurs/view";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MonCompte = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <>
      <Header title="Mon compte" />

      <Utilisateur user={user} />

      <ListGroup className="mb-2">
        {/* <View.Toolbar icon={<Icon.Sliders size="1.2rem" className="me-1" />} label="Rôle" /> */}
        <ListGroup.Item
          as="button"
          variant="danger"
          onClick={() => {
            navigate("/update-password");
          }}
        >
          Modifier mot de passe
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default MonCompte;
