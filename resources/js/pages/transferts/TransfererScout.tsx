import { HookModalForm, TextInput } from "components";
import { FC } from "react";

import { Alert, Col, Row } from "react-bootstrap";

import * as yup from "yup";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";
import { withMutationForm, WrapperV2Props } from "hoc/withMutationForm";
import { notifier } from "utils/notification";

const schema = yup.object({
  codeUniteArrivee: yup.string().required().nullable(),
});

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} labels={{ saveLabel: "Envoyer" }} modalBodyClassName="bg-light">
      <Alert variant="warning">
        <Alert.Heading>{props.meta.nomScout}</Alert.Heading>
        Une demande de transfert sera envoyée au chef de l’unité destinataire et devra être validée.
      </Alert>
      <Row>
        <Col sm={12}>
          <TextInput name="codeUniteArrivee" label="Code de l'unite de destination" isRequired />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const TransfertScoutForm = withMutationForm(Form, schema);

type Props = {
  closeModal: () => void;
  scout: PersonneResource;
};

export const TransfererScout: FC<Props> = ({ closeModal, scout }) => {
  const creerDemandeTransfert = (data: Record<string, string>) => {
    return personneApi.transferer(scout.id, { codeUniteArrivee: data.codeUniteArrivee });
  };

  return (
    <TransfertScoutForm
      onSave={creerDemandeTransfert}
      title="Demande de transfert"
      meta={{
        nomScout: `Transfert de ${scout.prenom} ${scout.nom}`,
      }}
      onSuccess={() => {
        notifier.succes("Demande de transfert envoyée avec succès");
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
