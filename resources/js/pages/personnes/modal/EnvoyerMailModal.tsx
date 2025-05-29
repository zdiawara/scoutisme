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
      labels={{
        saveLabel: "Envoyer",
        cancelLabel: "Annuler",
      }}
      modalBodyClassName="bg-gray-100 p-1"
      onClose={props.onExit}
      modalProps={{
        scrollable: true,
        size: "lg",
      }}
    >
      <Alert variant="secondary">
        {/* <Alert.Heading>Informations</Alert.Heading> */}
        <p className="m-0">
          Ce mail sera envoyé aux personnes présentes dans le tableau de
          recherche
        </p>
      </Alert>
      <Row className="g-3">
        <Col xs={12}>
          <TextInput
            name="objet"
            label="Objet "
            placeholder="Objet du mail"
            isRequired
          />
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
  const sendMail = (data: Record<string, any>) => {
    return personneApi.envoyerMail(
      {
        mail: data,
      },
      filter
    );
  };

  return (
    <EnvoyerMailModalForm
      onSave={sendMail}
      title="Envoyer un mail"
      onSuccess={closeModal}
      onExit={closeModal}
    />
  );
};
