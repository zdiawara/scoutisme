import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { RoleResource } from "types/auth.type";
import { EditRole } from "../edit/EditRole";
import { SupprimerRole } from "./SupprimerRole";

type RoleActionProps = {
  role?: RoleResource;
};

export const RoleAction: FC<RoleActionProps> = ({ role }) => {
  const [action, setAction] = useState<string | null>(null);

  const closeModal = () => {
    setAction(null);
  };

  if (!role) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline-primary"
        className="me-1"
        onClick={() => {
          setAction("edit");
        }}
      >
        Modifier
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          setAction("supprimer");
        }}
      >
        Supprimer
      </Button>
      {action === "edit" && <EditRole role={role} closeModal={closeModal} />}
      {action === "supprimer" && role && <SupprimerRole role={role} closeModal={closeModal} />}
    </>
  );
};
