import { personneApi } from "api";
import { HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { TextEditor } from "pages/messages/form/TextEditor";
import { messageSchema } from "pages/messages/form/messageUtils";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Alert variant="info">Ce mail sera envoyé au 22 000 personnes.</Alert>
      <Row className="g-3">
        <Col xs={12}>
          <TextInput name="objet" label="Objet du mail" isRequired />
        </Col>

        <Col xs={12}>
          <TextEditor name="contenu" label="Contenu" />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const EnvoyerMailModalForm = withMutationForm(Form, messageSchema);

type EnvoyerMailModalProps = {
  filter: Record<string, any>;
  closeModal: () => void;
};

export const EnvoyerMailModal: FC<EnvoyerMailModalProps> = ({
  filter,
  closeModal,
}) => {
  return (
    <EnvoyerMailModalForm
      onSave={(data) => {
        return personneApi.envoyerMail(
          {
            mail: data,
          },
          filter
        );
      }}
      title="Rédiger l'email à envoyer"
      onSuccess={closeModal}
      onExit={closeModal}
    />
  );
};
