import { useAuth } from "hooks";
import { Organisation } from "pages/organisations/view";
import { Card } from "react-bootstrap";
const MonOrganisation = () => {
  const { user } = useAuth();
  const organisation = user?.personne?.organisation;

  if (organisation) {
    return (
      <Organisation organisationId={organisation.id} showBackBtn={false} />
    );
  }
  return (
    <Card className="mt-3" body>
      Pas d'organisation à afficher
    </Card>
  );
};

export default MonOrganisation;
