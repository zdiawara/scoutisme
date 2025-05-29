import { FC } from "react";
import { Button, ListGroup, Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { TypeOrganisationResource } from "types/organisation.type";

type Props = {
  types?: TypeOrganisationResource[];
  edit: (type: TypeOrganisationResource) => void;
};

export const ListTypeUnite: FC<Props> = ({ types, edit }) => {
  if (!types?.length) {
    return <ListGroup.Item className="text-center text-muted">Aucun type trouvé</ListGroup.Item>;
  }

  return (
    <>
      {types.map((type) => (
        <ListGroup.Item key={type.id} className="d-flex justify-content-between align-items-start">
          <div>
            <Stack direction="horizontal" className="align-items-center">
              <div className="fw-semibold fs-5 text-black me-1">{type.nom}</div>
              <span className="fs-6">{type.code}</span>
            </Stack>
            <div>{type.membre}</div>
          </div>
          <Button variant="default" onClick={() => edit(type)}>
            <Icon.Pencil />
          </Button>
        </ListGroup.Item>
      ))}
    </>
  );
};
