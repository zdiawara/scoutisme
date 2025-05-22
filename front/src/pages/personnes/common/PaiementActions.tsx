import { FC, useMemo } from "react";
import { Button, Stack } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { useModalAction } from "hooks";
import {
  ModifierPaiementModal,
  RejeterPaiementModal,
  ValiderPaiementModal,
} from "pages/paiements/modal";
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
    const ACTIONS = [
      {
        label: "Valider",
        description: "Valider le paiement",
        code: "valider",
        visible: cotisation.paiements.valider,
        // disabled: paiement.etat === "valide",
        Icon: Icon.CheckCircle,
      },
      {
        label: "Rejeter",
        description: "Rejeter le paiement",
        code: "rejeter",
        visible: cotisation.paiements.rejeter,
        Icon: Icon.XLg,
      },
      {
        label: "Modifier",
        icon: "uil-edit-alt",
        description: "Modifier le paiement",
        code: "modifier",
        visible: cotisation.paiements.creer,
        Icon: Icon.Pencil,
      },
      {
        label: "Récu",
        icon: "uil-file-check-alt",
        description: "Télécharger le récu du paiement",
        code: "telecharger_recu",
        Icon: Icon.Download,
      },
      {
        label: "Supprimer",
        icon: "uil-trash-alt",
        description: "Supprimer le paiement",
        code: "supprimer",
        visible: cotisation.paiements.creer,
        Icon: Icon.Trash3,
      },
    ];

    return ACTIONS; //.filter((e) => e.visible);
  }, [cotisation]);

  if (!Boolean(actions.length)) {
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
              paiementApi
                .download(`${paiement.id}/recus`)
                .then(modalAction.close);
            }
            modalAction.change(code)();
          }}
        />
      </Stack>
      {modalAction.action === "valider" && (
        <ValiderPaiementModal
          closeModal={modalAction.close}
          paiement={paiement}
        />
      )}
      {modalAction.action === "rejeter" && (
        <RejeterPaiementModal
          closeModal={modalAction.close}
          paiement={paiement}
        />
      )}
      {modalAction.action === "modifier" && (
        <ModifierPaiementModal
          closeModal={modalAction.close}
          paiement={paiement}
        />
      )}
      {modalAction.action === "supprimer" && (
        <DeletePaiementModal
          closeModal={modalAction.close}
          element={paiement}
        />
      )}
      {modalAction.action === "voir" && (
        <VoirPaiementModal closeModal={modalAction.close} paiement={paiement} />
      )}
    </>
  );
};
