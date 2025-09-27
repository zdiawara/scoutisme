import { FC, useMemo, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { SousOrganisationModal } from "./SousOrganisationModal";

import * as Icon from "react-bootstrap-icons";
import { DropOption } from "components/options/DropOptions";
import { useDroits } from "hooks/useDroits";
import { Stack } from "react-bootstrap";

type SousOrganisationActionsProps = {
  organisation: OrganisationResource;
};

export const SousOrganisationActions: FC<SousOrganisationActionsProps> = ({ organisation }) => {
  const [action, setAction] = useState<string | undefined>();
  const droits = useDroits();

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  const actions = useMemo(() => {
    const actions = [
      {
        label: "Ajouter",
        Icon: Icon.PlusCircle,
        description: "Rattacher une nouvelle organisation",
        code: "ajouter_sous_organisation",
        visible: droits.organisation.creer,
      },
      // {
      //   label: "Nomminer",
      //   Icon: Icon.PersonAdd,
      //   description: "Positionner les responsables",
      //   code: "nommer",
      // },
    ];
    return actions.filter((e) => e.visible);
  }, [droits.organisation]);

  if (!actions.length) {
    return null;
  }
  return (
    <Stack direction="horizontal">
      <div className="ms-1">
        <DropOption onSelect={(code) => onSelect(code)()} actions={actions} variant="secondary" />

        {action === "ajouter_sous_organisation" && (
          <SousOrganisationModal closeModal={closeModal} organisation={organisation} />
        )}
      </div>
    </Stack>
  );
};
