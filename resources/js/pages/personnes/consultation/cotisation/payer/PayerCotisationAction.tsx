import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";

// import { useDroits } from "hooks/useDroits";
import { CreerPaiementModal } from "pages/paiements/modal";

type PayerCotisationActionProps = {
  personne: PersonneResource;
  annee: string;
  resteAPayer: number;
};

export const PayerCotisationAction: FC<PayerCotisationActionProps> = ({ personne, annee, resteAPayer }) => {
  const [action, setAction] = useState<string | undefined>();
  const closeModal = () => {
    setAction(undefined);
  };

  const onSelect = (code: string) => () => {
    if (resteAPayer <= 0) {
      setAction("cotisation_a_jour");
    } else {
      setAction(code);
    }
  };

  return (
    <>
      <Button size="sm" className="ms-1" onClick={onSelect("payer")} variant="secondary">
        Payer
      </Button>

      {action === "payer" && (
        <CreerPaiementModal resteAPayer={resteAPayer} closeModal={closeModal} personne={personne} annee={annee} />
      )}

      {action === "cotisation_a_jour" && (
        <Modal show={true} onHide={closeModal} size="sm" centered animation>
          <Modal.Body className="p-4">
            <div className="text-center">
              <i className="dripicons-checkmark h1"></i>
              <h4 className="mt-2 text-primary">Information</h4>
              <div className="mt-3 mb-3">Il ne reste aucune somme à payer.</div>
              <Button variant="outline-primary" className="shadow-sm" onClick={closeModal}>
                OK
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
