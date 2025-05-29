import { FC, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { useCarte } from "../carte/useCarte";
import { Carte } from "../carte/Carte";
import { SubmitButton } from "components/buttons";

type Props = {
  personne: PersonneResource;
  closeModal: () => void;
};
export const TelechargerCarteModal: FC<Props> = ({ personne, closeModal }) => {
  const { carte, isLoading, telechargerCarte } = useCarte(personne.id);
  const [download, setDownload] = useState(false);
  return (
    <>
      <Modal centered show={true}>
        <Modal.Header>
          <Modal.Title>Télécharger carte d'adhésion</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-1">
          {isLoading || !carte ? (
            <>Loading</>
          ) : carte?.message ? (
            <Alert variant="danger">{carte?.message}</Alert>
          ) : (
            <Carte carte={carte.data} photo={personne.photo} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} variant="outline-primary">
            Annuler
          </Button>
          <SubmitButton
            disabled={Boolean(carte?.message) || !carte}
            isLoading={download}
            variant="primary"
            onClick={async () => {
              setDownload(true);
              await telechargerCarte();
              setDownload(false);
              closeModal();
            }}
          >
            Télécharger
          </SubmitButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
