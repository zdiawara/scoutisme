import { FC } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import useToggle from "hooks/useToggle";
import { personneApi } from "api";
import { useQuery } from "@tanstack/react-query";
import { Carte } from "./Carte";

type Props = {
  personne: PersonneResource;
};

export const PersonneCarte: FC<Props> = ({ personne }) => {
  const [show, toggleForm] = useToggle();

  const { data: carte, isLoading } = useQuery({
    queryKey: ["carte_membre", personne.id],
    queryFn: () => {
      return personneApi.carteMembre(personne.id);
    },
  });

  if (isLoading) {
    return <span>Chargement ...</span>;
  }

  if (!carte) {
    return <span>Pas de données</span>;
  }

  if (carte.message) {
    return (
      <Alert variant="danger" className="mb-0 border-0">
        <Alert.Heading>
          <Icon.InfoCircle className="me-1" /> Information
        </Alert.Heading>
        <p>{carte.message}</p>
      </Alert>
    );
  }

  return (
    <>
      <ListGroup className="mb-3">
        <View.Toolbar
          right={
            <Button
              size="sm"
              variant="secondary"
              onClick={() => toggleForm()}
              disabled={show}
            >
              <Icon.Download /> Télécharger
            </Button>
          }
        />

        <ListGroup.Item>
          <Carte carte={carte.data} photo={personne.photo} />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
