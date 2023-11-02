import { HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { cotisationApi, paiementApi } from "api";
import { CotisationResource, PersonneResource } from "types/personne.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { paiementSchema } from "../form/paiementUtils";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-2">
        <Col>
          <div className="text-black">
            <p>
              <span className="fs-4">Montant total à payer</span> :&nbsp;
              <strong>{props.meta.montant_total} FCFA</strong>
            </p>
            <p>
              <span className="fs-4"> Reste à payer</span> :&nbsp;
              <strong>{props.meta.montant_restant} FCFA</strong>
            </p>
          </div>
        </Col>
        <Col sm={12}>
          <TextInput
            name="montant"
            label="Montant"
            placeholder="Renseignez le montant payé"
            description="Il s'agit du montant payé par la personne"
            isRequired
          />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const PaiementForm = withMutationForm(Form, paiementSchema);

type PaiementModalProps = {
  personne: PersonneResource;
  closeModal: () => void;
};

export const PaiementModal: FC<PaiementModalProps> = ({
  personne,
  closeModal,
}) => {
  const query = useQueryClient();

  const { data: results, isLoading } = useQuery({
    queryKey: [QUERY_KEY.cotisations, personne.id, 2023],
    networkMode: "offlineFirst",
    cacheTime: 0,
    queryFn: () => {
      return cotisationApi.findAll<CotisationResource>({
        personneId: personne.id,
        annee: 2023,
      });
    },
  });

  const payer = (data: Record<string, any>) => {
    return paiementApi.create({
      ...data,
      annee: 2023,
      personne_id: personne.id,
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <PaiementForm
      onSave={payer}
      title={`Payer cotisation de ${personne.prenom} ${personne.nom}`}
      defaultValues={{}}
      meta={{
        montant_total: results?.data[0]?.montant_total || "4 000",
        montant_restant: results?.data[0]?.montant_restant || "4 000",
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.paiements, personne.id]);
        query.invalidateQueries([QUERY_KEY.cotisations, personne.id, 2023]);
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
