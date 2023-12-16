import { HookModalForm, SelectRole, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { personneApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { PersonneResource } from "types/personne.type";

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
      <Row className="g-3">
        <Col xs={12}>
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
      onSuccess={() => {
        query.invalidateQueries(["users"]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
