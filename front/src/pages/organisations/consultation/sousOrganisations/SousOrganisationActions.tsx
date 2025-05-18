import { FC, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { SousOrganisationModal } from "./SousOrganisationModal";

import * as Icon from "react-bootstrap-icons";
import { DropOption } from "components/options/DropOptions";

const ACTIONS = [
  {
    label: "Ajouter",
    Icon: Icon.PlusCircle,
    description: "Rattacher une nouvelle organisation",
    code: "ajouter_sous_organisation",
  },
  {
    label: "Nomminer",
    Icon: Icon.PersonAdd,
    description: "Positionner les responsables",
    code: "nommer",
  },
];

type SousOrganisationActionsProps = {
  organisation: OrganisationResource;
};

export const SousOrganisationActions: FC<SousOrganisationActionsProps> = ({
  organisation,
}) => {
  const [action, setAction] = useState<string | undefined>();

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  return (
    <div className="ms-1">
      <DropOption
        onSelect={(code) => onSelect(code)()}
        actions={ACTIONS}
        variant="secondary"
      />

      {action === "ajouter_sous_organisation" && (
        <SousOrganisationModal
          closeModal={closeModal}
          organisation={organisation}
        />
      )}
    </div>
  );
};
