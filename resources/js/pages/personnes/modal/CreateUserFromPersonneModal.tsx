import { HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, useState } from "react";
import { Alert, Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { personneApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { PersonneResource } from "types/personne.type";

import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup.string().required(),
});

/**
 * Formulaire d'ajout et de modification d'un role
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} modalBodyClassName="bg-light p-3" onClose={props.onExit}>
      <Alert className="text  bg-white text-dark shadow-sm" variant="default">
        <Alert.Heading>Création d'un utilisateur</Alert.Heading>
        <p className="mb-2">
          Vous êtes sur le point de donner l'accès à <strong>{props.meta.personne}</strong> à l'application. Il s'en
          suivra les actions suivantes :
        </p>
        <ul>
          <li>
            Créer un compte utilisateur pour&nbsp;
            <strong>{props.meta.personne}</strong>
          </li>
          <li>
            Envoyer un mail&nbsp;à&nbsp;<strong>{props.meta.personne}</strong>
            &nbsp;contenant ses identifiants et son périmètre d'action
          </li>
        </ul>
      </Alert>
      <Row className="g-3">
        <Col xs={12}>
          <TextInput
            placeholder="Adresse email"
            label="Email"
            name="email"
            isRequired
            description="Adresse mail avec lequel la personne va s'authentifier dans l'application"
          />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const UserForm = withMutationForm(Form, schema);

type CreateUserFromPersonneModalProps = {
  closeModal: () => void;
  personne: PersonneResource;
};

export const CreateUserFromPersonneModal: FC<CreateUserFromPersonneModalProps> = ({ closeModal, personne }) => {
  const query = useQueryClient();

  const [isLoading, setLoading] = useState(false);

  const save = async () => {
    try {
      setLoading(true);
      await personneApi.convertir(personne.id);
      toast("L'utilisateur a bien été créé !", {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        position: "top-right",
      });
      closeModal();
    } catch (err: any) {
      toast(err.message, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        position: "top-right",
      });
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
