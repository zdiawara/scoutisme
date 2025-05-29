import { FC } from "react";
import { Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { RefFormationResource } from "types/organisation.type";

type Props = {
  formations?: RefFormationResource[];
  editFormation: (formation: RefFormationResource) => void;
};

export const ListFormation: FC<Props> = ({ formations, editFormation }) => {
  if (!formations?.length) {
    return <ListGroup.Item className="text-center text-muted">Aucun référentiel de formation trouvé</ListGroup.Item>;
  }

  return (
    <>
      {formations.map((formation) => {
        return (
          <ListGroup.Item key={formation.id} className="d-flex justify-content-between align-items-start">
            <div className="align-self-center fw-semibold fs-5 text-black">{formation.nom}</div>
            <Button variant="default" onClick={() => editFormation(formation)}>
              <Icon.Pencil />
            </Button>
          </ListGroup.Item>
        );
      })}
    </>
  );
};
