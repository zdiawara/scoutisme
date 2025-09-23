import { FC } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import { Carte } from "./Carte";
import { useCarte } from "./useCarte";

type Props = {
  personne: PersonneResource;
};

export const PersonneCarte: FC<Props> = ({ personne }) => {
  const { carte, isLoading, telechargerCarte } = useCarte(personne.id);

  return (
    <ListGroup className="mb-3">
      <View.Toolbar
        right={
          <Button variant="secondary" disabled={Boolean(carte?.message) || !carte} onClick={telechargerCarte}>
            <Icon.Download />
          </Button>
        }
      />
      <ListGroup.Item>
        {isLoading || !carte ? (
          <>Loading</>
        ) : carte?.message ? (
          <Alert variant="danger">{carte?.message}</Alert>
        ) : (
          <Carte carte={carte.data} photo={personne.photo} />
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};
