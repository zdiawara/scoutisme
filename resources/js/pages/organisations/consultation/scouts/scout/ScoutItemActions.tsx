import { FC, useMemo } from "react";
import { Stack } from "react-bootstrap";
import { useModalAction } from "hooks";
import { DropOption } from "components/options/DropOptions";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { LINKS } from "utils";
import { PersonneResource } from "types/personne.type";
import { useDroits } from "hooks/useDroits";
import { TransfererScout } from "../../../../transferts";

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
        description: "Accéder à la fiche du scout",
        code: "consulter",
        Icon: Icon.Eye,
        visible: true,
      },
      {
        label: "Transferer",
        description: "Transferer le scout vers une autre unité",
        code: "transferer",
        Icon: Icon.Send,
        visible: droits.personne.scouts.affecter,
      },
      // {
      //   label: "Supprimer",
      //   description: "Retier le scout de l'ASBF",
      //   code: "supprimer",
      //   Icon: Icon.Trash3,
      //   visible: droits.personne.scouts.creer,
      // },
    ];
    return ACTIONS.filter((e) => e.visible);
  }, [droits]);

  return (
    <>
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
      {modalAction.action === "transferer" && <TransfererScout scout={personne} closeModal={modalAction.close} />}
    </>
  );
};
