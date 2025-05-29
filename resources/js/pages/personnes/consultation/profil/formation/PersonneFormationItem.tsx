import { DropOption } from "components/options/DropOptions";
import { FC, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FormationResource } from "types/personne.type";
import { DateFormater } from "utils/DateUtils";
import * as Icon from "react-bootstrap-icons";
import { EditPersonneFormation } from "./EditPersonneFormation";
import { ConfirmationModal } from "pages/common";

type Props = {
  formation: FormationResource;
  onSave: (data: Record<string, any>) => Promise<any>;
  onDelete: () => void;
};

const ACTIONS = [
  {
    label: "Modifier",
    description: "Modifier la formation",
    code: "modifier",
    Icon: Icon.Pencil,
  },
  {
    label: "Supprimer",
    icon: "uil-user",
    description: "Supprimer la formation",
    code: "supprimer",
    Icon: Icon.Trash3,
  },
];

export const PersonneFormationItem: FC<Props> = ({
  onSave,
  onDelete,
  formation,
}) => {
  const [action, setAction] = useState<string | undefined>();
  const close = () => setAction(undefined);
  return (
    <>
      {action === "modifier" ? (
        <EditPersonneFormation
          onClose={close}
          formation={formation}
          onSave={onSave}
        />
      ) : (
        <ListGroup.Item
          key={formation.reference.id}
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <div className="fw-bold">{formation.reference.nom}</div>
            <span className="fw-light">
              {DateFormater.toDateText(formation.date_formation)}
            </span>
          </div>
          <DropOption actions={ACTIONS} onSelect={setAction} />
        </ListGroup.Item>
      )}
      {action === "supprimer" && (
        <ConfirmationModal
          onCancel={close}
          onValide={() => {
            onDelete();
            close();
          }}
          title="Confirmez la suppression"
          description={`Vous voulez vraiment supprimer la formation ${formation.reference.nom} ?`}
        />
      )}
    </>
  );
};
