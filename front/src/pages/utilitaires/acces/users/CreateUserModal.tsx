import { HookModalForm, SelectRole, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { userApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { UserResource } from "types/auth.type";
import { userConverter } from "./userUtils";

/**
 * Formulaire d'ajout et de modification d'un role
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-3">
        <Col sm={6}>
          <TextInput
            placeholder="Nom et prénom"
            label="Nom"
            name="name"
            isRequired
          />
        </Col>

        <Col sm={6}>
          <TextInput
            placeholder="Adresse email"
            label="Email"
            name="email"
            isRequired
          />
        </Col>

        <Col xs={12}>
          <SelectRole placeholder="Rôle" label="Rôle" name="role" isRequired />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const UserForm = withMutationForm(Form);

type CreateUserModalProps = {
  closeModal: () => void;
  user?: UserResource;
};

export const CreateUserModal: FC<CreateUserModalProps> = ({
  closeModal,
  user,
}) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    const body = userConverter.toBody(data);
    if (user?.id) {
      return userApi.update(user.id, body);
    }
    return userApi.create(body);
  };

  return (
    <UserForm
      onSave={save}
      title={`${user?.id ? "Modifier" : "Ajouter"} un utilisateur`}
      //subtitle="Rôle occupé par les utilisateurs de l'application"
      defaultValues={user?.id ? userConverter.toInput(user) : {}}
      onSuccess={() => {
        query.invalidateQueries(["users"]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
