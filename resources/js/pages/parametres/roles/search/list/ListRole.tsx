import { FC } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { RoleResource } from "types/auth.type";

type Props = {
  roles?: RoleResource[];
  edit: (fonction: RoleResource) => void;
};

export const ListRole: FC<Props> = ({ roles, edit }) => {
  if (!roles?.length) {
    return <ListGroup.Item className="text-center text-muted">Aucun rôle trouvé</ListGroup.Item>;
  }

  return (
    <>
      {roles.map((role) => (
        <ListGroup.Item key={role.id} className="d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-semibold fs-5 text-black">{role.nom}</div>
            {!!role.perimetres.length && (
              <div className="mt-1">
                {role.perimetres.map((perimetre) => (
                  <Badge key={perimetre} bg="secondary" className="me-1">
                    {perimetre}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button variant="default" onClick={() => edit(role)}>
            <Icon.Pencil />
          </Button>
        </ListGroup.Item>
      ))}
    </>
  );
};
