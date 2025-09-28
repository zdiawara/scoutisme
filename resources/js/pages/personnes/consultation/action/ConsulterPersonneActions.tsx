// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { useMemo, useState } from "react";
import { useDroits } from "hooks/useDroits";
import { DropOption } from "components/options/DropOptions";
import { PersonneResource } from "types/personne.type";
import { TelechargerCarteModal } from "./TelechargerCarteModal";
import { CreateUserFromPersonneModal } from "pages/personnes/modal/CreateUserFromPersonneModal";
import { PersonneUtils } from "utils/PersonneUtils";

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
      // {
      //   label: "Photo",
      //   icon: "uil-edit-alt",
      //   description: "Mettre à jour la photo",
      //   code: "modifier",
      //   Icon: Icon.Image,
      //   visible: droits.personne.modifier(personne),
      // },
      {
        label: "Carte",
        description: "Télécharger la carte d'adhésion",
        code: "carte",
        Icon: Icon.Download,
        visible: droits.personne.affecter(personne),
      },
      // {
      //   label: "Transferer",
      //   description: "Transferer vers une autre unité",
      //   code: "transferer",
      //   Icon: Icon.Send,
      //   visible: true,
      // },
      {
        label: "Accès à l'application",
        description: "Donner un accès à l'application à cette personne",
        code: "acces",
        Icon: Icon.Link,
        visible: droits.personne.modifier(personne) && PersonneUtils.isAdulte(personne),
      },
      // {
      //   label: "Supprimer",
      //   description: "Supprimer définitimenent la personne",
      //   code: "supprimer",
      //   Icon: Icon.Trash3,
      //   visible: droits.personne.modifier(personne),
      // },
    ].filter((e) => e.visible);
  }, [droits.personne, personne]);

  if (!menus.length) {
    return null;
  }
  return (
    <>
      <DropOption actions={menus} onSelect={onSelect} menu={false} variant="secondary" />
      {action === "carte" && <TelechargerCarteModal personne={personne} closeModal={closeModal} />}
      {action === "acces" && <CreateUserFromPersonneModal closeModal={closeModal} personne={personne} />}
    </>
  );
};
