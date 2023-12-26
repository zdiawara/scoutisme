import { personneApi } from "api";
import { HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { TextEditor } from "pages/messages/form/TextEditor";
import { messageSchema } from "pages/messages/form/messageUtils";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      labels={{
        saveLabel: "Envoyer",
        cancelLabel: "Annuler",
      }}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Alert className="fw-bold bg-primary text-white">{props.meta.info}</Alert>
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
  nombrePers: number;
  closeModal: () => void;
};

export const EnvoyerMailModal: FC<EnvoyerMailModalProps> = ({
  filter,
  nombrePers,
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
  if (nombrePers === 0) {
    closeModal();
    toast("Aucun destinaire trouvé", {
      type: toast.TYPE.WARNING,
      autoClose: 5000,
      position: "bottom-right",
    });
    return null;
  }
  return (
    <EnvoyerMailModalForm
      onSave={sendMail}
      title="Envoyer mail"
      subtitle="Rédiger et envoyer un mail"
      meta={{
        info: `Ce mail sera envoyé à ${nombrePers} personne(s)`,
      }}
      onSuccess={closeModal}
      onExit={closeModal}
    />
  );
};
