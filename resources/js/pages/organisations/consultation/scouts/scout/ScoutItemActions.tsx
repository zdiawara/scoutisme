import { FC, useMemo } from "react";
import { Stack } from "react-bootstrap";
import { useModalAction } from "hooks";
import { DropOption } from "components/options/DropOptions";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { LINKS } from "utils";
import { PersonneResource } from "types/personne.type";
import { useDroits } from "hooks/useDroits";

type Props = {
  personne: PersonneResource;
};

export const ScoutItemActions: FC<Props> = ({ personne }) => {
  const modalAction = useModalAction();
  const navigation = useNavigate();
  const droits = useDroits();
  const actions = useMemo(() => {
    const ACTIONS = [
      {
        label: "Consulter",
        description: "Voir la fiche du scout",
        code: "consulter",
        Icon: Icon.Eye,
        visible: true,
      },
      {
        label: "Transferer",
        description: "Transferer vers une autre unité",
        code: "supprimer",
        Icon: Icon.Send,
        visible: droits.personne.scouts.affecter,
      },
      {
        label: "Supprimer",
        description: "Supprimer le scout",
        code: "supprimer",
        Icon: Icon.Trash3,
        visible: droits.personne.scouts.creer,
      },
    ];
    return ACTIONS.filter((e) => e.visible);
  }, [droits.personne.scouts.affecter, droits.personne.scouts.creer]);

  return (
    <Stack direction="horizontal" className="ms-auto">
      <DropOption
        actions={actions}
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
