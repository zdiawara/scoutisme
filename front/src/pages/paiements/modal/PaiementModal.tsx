import { HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { paiementApi, personneApi } from "api";
import { PaiementResource, PersonneResource } from "types/personne.type";
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

type CreerPaiementModalProps = {
  personne: PersonneResource;
  annee: string;
  closeModal: () => void;
};

export const CreerPaiementModal: FC<CreerPaiementModalProps> = ({
  personne,
  annee,
  closeModal,
}) => {
  const query = useQueryClient();

  const { data: cotisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.personnes, "cotisations", annee],
    networkMode: "offlineFirst",
    cacheTime: 0,
    queryFn: () => {
      return personneApi.findCotisation(personne.id, annee);
    },
    select: ({ data }) => data,
  });

  const payer = (data: Record<string, any>) => {
    return paiementApi.create({
      ...data,
      annee,
      personne_id: personne.id,
    });
  };

  if (isLoading) {
    return null;
  }

  if (!cotisation) {
    return null;
  }

  return (
    <PaiementForm
      onSave={payer}
      title={`Payer cotisation de ${personne.prenom} ${personne.nom}`}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.paiements, personne.id]);
        query.invalidateQueries([QUERY_KEY.cotisations, personne.id, annee]);
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

type ModifierPaiementModalProps = {
  paiement: PaiementResource;
  closeModal: () => void;
};

export const ModifierPaiementModal: FC<ModifierPaiementModalProps> = ({
  paiement,
  closeModal,
}) => {
  const query = useQueryClient();

  const modifier = (data: Record<string, any>) => {
    return paiementApi.update(paiement.id, {
      montant: data.montant,
    });
  };

  return (
    <PaiementForm
      onSave={modifier}
      title={`Modifier le paiement ${paiement.code}`}
      defaultValues={{
        montant: paiement.montant,
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.paiements]);
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
