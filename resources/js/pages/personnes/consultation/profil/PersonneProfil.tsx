import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { PersonneIdentite } from "./identite/PersonneIdentite";
import { PersonneCoordonnee } from "./coordonnee/PersonneCoordonnee";
import { PersonneAContacter } from "./referent/PersonneAContacter";

type Props = {
  personne: PersonneResource;
};

export const PersonneProfil: FC<Props> = ({ personne }) => {
  return (
    <>
      <ListGroup className="mb-2">
        <PersonneIdentite personne={personne} />
      </ListGroup>
      <ListGroup className="mb-2">
        <PersonneCoordonnee personne={personne} />
      </ListGroup>
      <ListGroup className="mb-3">
        <PersonneAContacter personne={personne} />
      </ListGroup>
    </>
  );
};
