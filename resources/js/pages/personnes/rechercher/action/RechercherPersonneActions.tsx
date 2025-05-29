// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { useMemo, useState } from "react";
import { ExportPersonneModal } from "pages/personnes/modal";
import { EnvoyerMailModal } from "pages/personnes/modal/EnvoyerMailModal";
import { useDroits } from "hooks/useDroits";
import { DropOption } from "components/options/DropOptions";

export const RechercherPersonneActions = ({ params }: { params: Record<string, any> }) => {
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
        label: "Ajouter",
        description: "Créer une nouvelle personne",
        code: "creer",
        Icon: Icon.PersonAdd,
        visible: droits.personne.adultes.creer || droits.personne.scouts.creer,
      },
      {
        label: "Exporter",
        description: "Exporter les personnes en CSV",
        code: "exporter",
        Icon: Icon.Download,
        visible: true,
      },
      {
        label: "Email",
        description: "Envoyer un mail aux personnes",
        code: "email",
        Icon: Icon.Send,
        visible: droits.mail.mails.envoyer,
      },
    ].filter((e) => e.visible);
  }, [droits.mail, droits.personne]);

  return (
    <>
      <DropOption actions={menus} onSelect={onSelect} menu={false} variant="secondary" />
      {action === "exporter" && <ExportPersonneModal filter={params} closeModal={closeModal} />}
      {action === "email" && <EnvoyerMailModal filter={params} closeModal={closeModal} />}
    </>
  );
};
