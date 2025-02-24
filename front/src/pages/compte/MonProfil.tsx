import { useAuth } from "hooks";
import { Personne } from "pages/personnes";
import { Button, Card } from "react-bootstrap";
const MonProfil = () => {
  const { user } = useAuth();
  const personne = user?.personne;

  if (personne) {
    return (
      <div className="mt-4">
        <Personne personneId={personne.id} />
      </div>
    );
  }

  return (
    <Card className="mt-3" body>
      Pas d'organisation à afficher
      <Button>OK</Button>
    </Card>
  );
};

export default MonProfil;
