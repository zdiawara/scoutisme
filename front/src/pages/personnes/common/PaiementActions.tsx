import { FC } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { useModalAction } from "hooks";
import {
  ModifierPaiementModal,
  RejeterPaiementModal,
  ValiderPaiementModal,
} from "pages/paiements/modal";

type PaiementActionsProps = {
  personne: PersonneResource;
  paiement: PaiementResource;
};

const ACTIONS = [
  /*   {
    label: "Modifier",
    icon: "uil-edit-alt",
    description: "Mettre à jour les informations de l'affectation",
    code: "modifier",
  }, */
  {
    label: "Valider",
    icon: "uil-check-circle",
    description: "Valider le paiement",
    code: "valider",
  },
  {
    label: "Rejeter",
    icon: "uil-multiply",
    description: "Rejeter le paiement",
    code: "rejeter",
  },
  {
    label: "Modifier",
    icon: "uil-edit-alt",
    description: "Modifier le paiement",
    code: "modifier",
  },
  {
    label: "Supprimer",
    icon: "uil-trash-alt",
    description: "Supprimer le paiement",
    code: "supprimer",
  },
  {
    label: "Récu",
    icon: "uil-file-check-alt",
    description: "Télécharger le récu du paiement",
    code: "recu",
  },
];

export const PaiementActions: FC<PaiementActionsProps> = ({
  personne,
  paiement,
}) => {
  const modalAction = useModalAction();

  return (
    <>
      <div className="text-end">
        <Dropdown className="ms-2">
          <Dropdown.Toggle
            as={Button}
            size="sm"
            variant="outline-light"
            className="arrow-none card-drop"
          >
            <i className="mdi mdi-dots-vertical" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="topbar-dropdown-menu mt-2">
            {ACTIONS.map((item) => (
              <Dropdown.Item
                as="button"
                className="py-2 px-3"
                onClick={modalAction.change(item.code)}
                key={item.code}
                //disabled={!attribution.id}
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
    </>
  );
};
