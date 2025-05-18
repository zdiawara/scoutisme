import { useAuth } from "hooks";
import { Personne } from "pages/personnes";
import { Button, Card } from "react-bootstrap";
const MonProfil = () => {
  const { user } = useAuth();
  const personne = user?.personne;

  if (personne) {
    return <Personne personneId={personne.id} title="Mon profil" />;
  }

  return (
    <Card className="mt-3" body>
      Pas d'organisation à afficher
      <Button>OK</Button>
    </Card>
  );
};

export default MonProfil;
