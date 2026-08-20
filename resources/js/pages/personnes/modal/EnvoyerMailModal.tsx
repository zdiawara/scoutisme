import { personneApi } from "api";
import { HookModalForm, TextInput } from "components";
import { useAuth } from "context/AuthContext";
import { WrapperV2Props, withMutationForm } from "hoc";
import { TextEditor } from "pages/messages/form/TextEditor";
import { messageSchema } from "pages/messages/form/messageUtils";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { buildPerimetres } from "utils/functions";

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
        <p className="m-0">Ce mail sera envoyé aux personnes présentes dans le tableau de recherche</p>
      </Alert>
      <Row className="g-3">
        <Col xs={12}>
          <TextInput name="objet" label="Objet " placeholder="Objet du mail" isRequired />
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

export const EnvoyerMailModal: FC<EnvoyerMailModalProps> = ({ filter, closeModal }) => {
  const auth = useAuth();
  const isAdmin = auth.userDroit?.isAdmin;
  const personne = auth.user?.personne;

  const sendMail = (data: Record<string, any>) => {
    const filterParams = { ...filter } as Record<string, any>;
    if (!isAdmin && personne?.organisation?.id && !filterParams.organisationId) {
      filterParams.organisationId = personne?.organisation?.id;
      filterParams.perimetres = buildPerimetres(personne?.organisation?.nature.code).join(";");
    }

    return personneApi.envoyerMail(
      {
        mail: data,
      },
      filterParams
    );
  };

  return <EnvoyerMailModalForm onSave={sendMail} title="Envoyer un mail" onSuccess={closeModal} onExit={closeModal} />;
};
