import { FC, useMemo } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { PaiementResource, PersonneResource } from "types/personne.type";
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

type PaiementActionsProps = {
  personne: PersonneResource;
  paiement: PaiementResource;
};

export const PaiementActions: FC<PaiementActionsProps> = ({
  personne,
  paiement,
}) => {
  const modalAction = useModalAction();
  const { cotisation } = useDroits();

  const actions = useMemo(() => {
    const ACTIONS = [
      {
        label: "Valider",
        icon: "uil-check-circle",
        description: "Valider le paiement",
        code: "valider",
        visible: cotisation.paiements.valider,
        disabled: paiement.etat === "valide",
      },
      {
        label: "Rejeter",
        icon: "uil-multiply",
        description: "Rejeter le paiement",
        code: "rejeter",
        visible: cotisation.paiements.rejeter,
        disabled: paiement.etat === "valide",
      },
      {
        label: "Modifier",
        icon: "uil-edit-alt",
        description: "Modifier le paiement",
        code: "modifier",
        visible: cotisation.paiements.creer,
        disabled: paiement.etat === "valide",
      },
      {
        label: "Supprimer",
        icon: "uil-trash-alt",
        description: "Supprimer le paiement",
        code: "supprimer",
        visible: cotisation.paiements.creer,
        disabled: paiement.etat === "valide",
      },
      {
        label: "Récu",
        icon: "uil-file-check-alt",
        description: "Télécharger le récu du paiement",
        code: "telecharger_recu",
        visible: cotisation.paiements.telecharger_recu,
      },
    ];

    return ACTIONS.filter((e) => e.visible);
  }, [cotisation, paiement]);

  if (!Boolean(actions.length)) {
    return null;
  }
  return (
    <>
      <div className="text-end d-flex justify-content-end">
        <Button
          title="Afficher les détails du paiement"
          variant="light text-dark"
          onClick={modalAction.change("voir")}
        >
          <i className=" uil-eye" />
        </Button>

        <Dropdown className="ms-2">
          <Dropdown.Toggle
            as={Button}
            size="sm"
            variant="light"
            className="arrow-none card-drop"
          >
            <i className="mdi mdi-dots-vertical" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="topbar-dropdown-menu mt-2">
            {actions.map((item) => (
              <Dropdown.Item
                as="button"
                className="py-2 px-3"
                onClick={() => {
                  if (item.code === "telecharger_recu") {
                    paiementApi
                      .download(`${paiement.id}/recus`)
                      .then(modalAction.close);
                  }
                  modalAction.change(item.code)();
                }}
                key={item.code}
                disabled={item.disabled}
              >
                <i className={`${item.icon} text-primary me-2`}></i>
                <span className="text-primary fs-5 fw-semibold">
                  {item.label}
                </span>
                <div className="text-muted fw-semibold">{item.description}</div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {modalAction.action === "valider" && (
        <ValiderPaiementModal
          closeModal={modalAction.close}
          paiement={paiement}
          personne={personne}
        />
      )}
      {modalAction.action === "rejeter" && (
        <RejeterPaiementModal
          closeModal={modalAction.close}
          paiement={paiement}
          personne={personne}
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
