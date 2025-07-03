import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { PersonneItem } from "./PersonneItem";

type Props = {
  personnes?: PersonneResource[];
};

export const ListPersonne: FC<Props> = ({ personnes }) => {
  if (!personnes?.length) {
    return <ListGroup.Item className="fw-light text-center">Aucune personne trouvée</ListGroup.Item>;
  }

  return (
    <>
      {personnes.map((personne) => (
        <ListGroup.Item className="d-flex justify-content-between align-items-start px-2 px-sm-4" key={personne.id}>
          <PersonneItem personne={personne} />
        </ListGroup.Item>
      ))}
    </>
  );
};
