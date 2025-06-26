import { HookModalForm, SelectRole, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";

/**
 * Formulaire d'ajout et de modification d'un role
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} modalBodyClassName="bg-light p-3" onClose={props.onExit}>
      <Row className="g-3">
        <Col sm={6}>
          <TextInput placeholder="Nom et prénom" label="Nom" name="name" isRequired />
        </Col>

        <Col sm={6}>
          <TextInput placeholder="Adresse email" label="Email" name="email" isRequired />
        </Col>

        <Col xs={12}>
          <SelectRole placeholder="Rôle" label="Rôle" name="role" isRequired />
        </Col>
      </Row>
    </HookModalForm>
  );
};

export const UtilisateurForm = withMutationForm(Form);
