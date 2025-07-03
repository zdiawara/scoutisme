import { FC, useMemo } from "react";
import { Button, Stack } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { useModalAction } from "hooks";
import { ModifierPaiementModal, RejeterPaiementModal, ValiderPaiementModal } from "pages/paiements/modal";
import { DeletePaiementModal } from "pages/paiements/modal/DeletePaiementModal";
import { paiementApi } from "api";
import { VoirPaiementModal } from "pages/paiements/modal/VoirPaiement";
import { useDroits } from "hooks/useDroits";
import { DropOption } from "components/options/DropOptions";
import * as Icon from "react-bootstrap-icons";

type PaiementActionsProps = {
  paiement: PaiementResource;
};

export const PaiementActions: FC<PaiementActionsProps> = ({ paiement }) => {
  const modalAction = useModalAction();
  const { cotisation } = useDroits();

  const actions = useMemo(() => {
    return [
      {
        label: "Valider",
        description: "Valider le paiement",
        code: "valider",
        visible: cotisation.paiements.valider,
        disabled: paiement.etat === "valide",
        Icon: Icon.CheckCircle,
      },
      {
        label: "Rejeter",
        description: "Rejeter le paiement",
        code: "rejeter",
        visible: cotisation.paiements.rejeter,
        disabled: paiement.etat === "valide",
        Icon: Icon.XLg,
      },
      {
        label: "Modifier",
        description: "Modifier le paiement",
        code: "modifier",
        visible: cotisation.paiements.creer,
        Icon: Icon.Pencil,
        disabled: paiement.etat === "valide",
      },
      {
        label: "Récu",
        description: "Télécharger le récu du paiement",
        code: "telecharger_recu",
        Icon: Icon.Download,
        disabled: paiement.etat !== "valide",
        visible: cotisation.paiements.creer,
      },
      {
        label: "Supprimer",
        description: "Supprimer le paiement",
        code: "supprimer",
        visible: cotisation.paiements.creer,
        Icon: Icon.Trash3,
        disabled: paiement.etat === "valide",
      },
    ].filter((e) => e.visible);
  }, [cotisation, paiement.etat]);

  if (!actions.length) {
    return null;
  }
  return (
    <>
      <Stack direction="horizontal" className="ms-auto align-self-start">
        <Button
          title="Afficher les détails du paiement"
          size="sm"
          variant="default"
          onClick={modalAction.change("voir")}
        >
          <Icon.Eye />
        </Button>
        <DropOption
          actions={actions}
          onSelect={(code) => {
            if (code === "telecharger_recu") {
              paiementApi.download(`${paiement.id}/recus`).then(modalAction.close);
            }
            modalAction.change(code)();
          }}
        />
      </Stack>
      {modalAction.action === "valider" && <ValiderPaiementModal closeModal={modalAction.close} paiement={paiement} />}
      {modalAction.action === "rejeter" && <RejeterPaiementModal closeModal={modalAction.close} paiement={paiement} />}
      {modalAction.action === "modifier" && (
        <ModifierPaiementModal closeModal={modalAction.close} paiement={paiement} />
      )}
      {modalAction.action === "supprimer" && <DeletePaiementModal closeModal={modalAction.close} element={paiement} />}
      {modalAction.action === "voir" && <VoirPaiementModal closeModal={modalAction.close} paiement={paiement} />}
    </>
  );
};
