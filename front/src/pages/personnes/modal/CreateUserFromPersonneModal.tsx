import { HookModalForm, SelectRole, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { personneApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { PersonneResource } from "types/personne.type";

import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required(),
  role: yup.object().required().nullable(),
});

/**
 * Formulaire d'ajout et de modification d'un role
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Alert className="text  bg-white text-dark shadow-sm" variant="default">
        <Alert.Heading>Création d'un utilisateur</Alert.Heading>
        <p className="mb-2">
          Vous êtes sur le point de transformer {props.meta.personne} en un
          utilisateur de l'application. Il s'en suivra les actions suivantes :
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
        <Col xs={12}>
          <SelectRole
            placeholder="Rôle"
            label="Rôle"
            name="role"
            isRequired
            description="Role occupé par la personne au sein de l'application."
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

export const CreateUserFromPersonneModal: FC<
  CreateUserFromPersonneModalProps
> = ({ closeModal, personne }) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    return personneApi.convertir(personne.id, {
      role_id: data.role.value,
      email: data.email,
    });
  };

  return (
    <UserForm
      onSave={save}
      title={`Transformer ${personne.prenom} ${personne.nom} en utilisateur`}
      defaultValues={{
        email: personne.email,
      }}
      meta={{
        personne: `${personne.prenom} ${personne.nom}`,
      }}
      onSuccess={() => {
        query.invalidateQueries(["users"]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
