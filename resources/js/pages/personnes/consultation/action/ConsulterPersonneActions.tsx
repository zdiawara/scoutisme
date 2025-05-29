// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { useMemo, useState } from "react";
import { useDroits } from "hooks/useDroits";
import { DropOption } from "components/options/DropOptions";
import { PersonneResource } from "types/personne.type";
import { TelechargerCarteModal } from "./TelechargerCarteModal";

type Props = {
  personne: PersonneResource;
};

export const ConsulterPersonneActions = ({ personne }: Props) => {
  const [action, setAction] = useState<string | undefined>();
  const droits = useDroits();

  const onSelect = (code: string) => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  const menus = useMemo(() => {
    return [
      {
        label: "Carte",
        description: "Télécharger la carte d'adhésion",
        code: "carte",
        Icon: Icon.Download,
        visible: droits.personne.affecter(personne),
      },
      {
        label: "Transferer",
        description: "Transferer vers une autre unité",
        code: "transferer",
        Icon: Icon.Send,
        visible: true,
      },
      {
        label: "Supprimer",
        description: "Supprimer définitimenent la personne",
        code: "supprimer",
        Icon: Icon.Trash3,
        visible: droits.personne.modifier(personne),
      },
    ].filter((e) => e.visible);
  }, [droits.personne, personne]);

  return (
    <>
      <DropOption
        actions={menus}
        onSelect={onSelect}
        menu={false}
        variant="secondary"
      />
      {action === "carte" && (
        <TelechargerCarteModal personne={personne} closeModal={closeModal} />
      )}
    </>
  );
};
