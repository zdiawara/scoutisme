import * as Icon from "react-bootstrap-icons";
import { useMemo, useState } from "react";
import { DropOption } from "components/options";
import { useDroits } from "hooks/useDroits";
import { ValiderPaiementsEnMasse } from "./ValiderPaiementsEnMasse";

export const RechercherPaiementActions = () => {
  const [action, setAction] = useState<string | undefined>();

  const droits = useDroits();

  const closeModal = () => {
    setAction(undefined);
  };

  const menus = useMemo(() => {
    return [
      {
        label: "Valider",
        description: "Valider des paiements en masse",
        code: "valider",
        Icon: Icon.CheckCircle,
        visible: droits.cotisation.can("valider"),
      },
    ].filter((e) => e.visible);
  }, [droits]);

  if (!menus.length) {
    return null;
  }

  return (
    <>
      <DropOption actions={menus} onSelect={setAction} menu={false} variant="secondary" />
      {action === "valider" && <ValiderPaiementsEnMasse closeModal={closeModal} />}
    </>
  );
};
