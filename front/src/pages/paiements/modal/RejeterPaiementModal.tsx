import { FC } from "react";
import { paiementApi } from "api";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { WrapperV2Props, withMutationForm } from "hoc";
import { HookModalForm, TextInput } from "components";
import { Col, Row } from "react-bootstrap";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-2">
        <Col sm={12}>
          <TextInput
            name="motif"
            label="Motif du rejet"
            placeholder="Renseignez le motif"
            description="Il s'agit du montant payé par la personne"
          />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const RejeterPaiementForm = withMutationForm(Form);

type PersonneCotisationModalProps = {
  personne: PersonneResource;
  paiement: PaiementResource;
  closeModal: () => void;
};

export const RejeterPaiementModal: FC<PersonneCotisationModalProps> = ({
  personne,
  paiement,
  closeModal,
}) => {
  const query = useQueryClient();

  const rejeterPaiement = async () => {
    await paiementApi.valider(paiement.id);
    closeModal();
    query.invalidateQueries([QUERY_KEY.paiements, personne.id]);
  };

  return (
    <RejeterPaiementForm
      onSave={rejeterPaiement}
      title="Rejeter paiement"
      defaultValues={{}}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.paiements, personne.id]);
        closeModal();
      }}
      onExit={closeModal}
      modalProps={{
        animation: false,
        centered: false,
      }}
    />
  );
};
