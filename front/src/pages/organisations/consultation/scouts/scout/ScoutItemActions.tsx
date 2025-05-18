import { FC } from "react";
import { Stack } from "react-bootstrap";
import { useModalAction } from "hooks";
import { DropOption } from "components/options/DropOptions";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { LINKS } from "utils";
import { PersonneResource } from "types/personne.type";

type Props = {
  personne: PersonneResource;
};

const ACTIONS = [
  {
    label: "Consulter",
    description: "Voir la fiche du scout",
    code: "consulter",
    Icon: Icon.Eye,
  },
  {
    label: "Transferer",
    description: "Transferer vers une autre unité",
    code: "supprimer",
    Icon: Icon.Send,
  },
  {
    label: "Supprimer",
    description: "Supprimer le scout",
    code: "supprimer",
    Icon: Icon.Trash3,
  },
];

export const ScoutItemActions: FC<Props> = ({ personne }) => {
  const modalAction = useModalAction();
  const navigation = useNavigate();
  return (
    <Stack direction="horizontal" className="ms-auto">
      <DropOption
        actions={ACTIONS}
        onSelect={(code) => {
          if (code === "consulter") {
            navigation(LINKS.personnes.view(personne.id));
          } else {
            modalAction.change(code)();
          }
        }}
      />
    </Stack>
  );
};
