import { View } from "components";
import { FC } from "react";
import { Card } from "react-bootstrap";

type PersonneCardProps = {};
export const PersonneCard: FC<PersonneCardProps> = () => {
  return (
    <Card>
      <Card.Body>
        <View.Header
          icon="mdi mdi-card-account-details-outline"
          label="Carte d'adhésion"
          description="Carte d'adhésion de la personne"
          className="mb-2"
        />
        En cours de developpement
      </Card.Body>
    </Card>
  );
};
