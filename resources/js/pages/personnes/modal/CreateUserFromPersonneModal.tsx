import { FC, useState } from "react";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";

import { notifier } from "utils/notification";

type CreateUserFromPersonneModalProps = {
  closeModal: () => void;
  personne: PersonneResource;
};

export const CreateUserFromPersonneModal: FC<CreateUserFromPersonneModalProps> = ({ closeModal, personne }) => {
  const [isLoading, setLoading] = useState(false);

  const save = async () => {
    try {
      setLoading(true);
      await personneApi.convertir(personne.id);
      notifier.succes("L'utilisateur a bien été créé !");
      closeModal();
    } catch (err: any) {
      notifier.erreur(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!personne.email) {
    return (
      <Modal show size="lg">
        <Modal.Header>
          <Modal.Title>
            Donner accès à {personne.prenom} {personne.nom}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <Alert.Heading>Action impossible</Alert.Heading>
            <p>Vous ne pouvons pas continuer cette action.&nbsp;</p>
            <p>
              <strong>
                {personne.prenom} {personne.nom}
              </strong>
              &nbsp;ne dispose pas d'adresse e-mail.
            </p>
            <p>Pour lui accorder l'accès à l'application, merci de définir son adresse e-mail.</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Modal show size="lg">
        <Modal.Header>
          <Modal.Title>
            Donner accès à {personne.prenom} {personne.nom}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <p>
              Vous êtes sur le point de donner l'accès à&nbsp;
              <strong>
                {personne.prenom} {personne.nom}
              </strong>
              &nbsp;à l'application.
            </p>
            <p>Il s'en suivra les actions suivantes :</p>
            <ul>
              <li>
                Création d'un compte utilisateur pour&nbsp;
                <strong>
                  {personne.prenom} {personne.nom}
                </strong>
              </li>
              <li>
                Envoie d'un mail de vérification à l'adresse <strong>{personne.email}</strong>
              </li>
            </ul>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button className="me-1" variant="outline-primary" onClick={closeModal} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={save} variant="primary" disabled={isLoading}>
            {isLoading && (
              <Spinner className="me-2" animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
