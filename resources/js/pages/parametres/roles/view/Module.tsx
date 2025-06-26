import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { ModuleResource, RoleResource } from "types/auth.type";

type Props = {
  module: ModuleResource;
  role: RoleResource;
};

export const Module: FC<Props> = ({ module, role }) => (
  <ListGroup className="mb-3">
    <ListGroup.Item>
      <div className="fw-bold text-dark fs-4">{module.nom}</div>
    </ListGroup.Item>
    {module.fonctionnalites
      .filter((e) => role.habilitations.map((e) => e.fonctionnalite.code).includes(e.code))
      .map((sm) => (
        <ListGroup.Item key={sm.id}>
          <span className="text-primary">{sm.nom}</span>
          <div className="text-muted">{sm.description}</div>
        </ListGroup.Item>
      ))}
  </ListGroup>
);
