import { HookModalForm, MontantFormatText, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { paiementApi, personneApi } from "api";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { paiementSchema } from "../form/paiementUtils";
import { useFormContext } from "react-hook-form";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch } = useFormContext();
  return (
    <HookModalForm {...props} modalBodyClassName="bg-light p-3" onClose={props.onExit}>
      <Row className="g-2">
        <Alert variant="warning">
          Le reste à payer est de <MontantFormatText value={watch("resteAPayer")} withDevise />
        </Alert>
        <Col sm={12}>
          <TextInput
            name="montant"
            label="Montant"
            placeholder="Renseignez le montant payé"
            description="Il s'agit du montant payé par la personne"
            isRequired
            type="number"
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
  resteAPayer: number;
};

export const CreerPaiementModal: FC<CreerPaiementModalProps> = ({ resteAPayer, personne, annee, closeModal }) => {
  const query = useQueryClient();

  const { data: cotisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.cotisations, personne.id, annee],
    networkMode: "offlineFirst",
    cacheTime: 0,
    queryFn: () => {
      return personneApi.findCotisation(personne.id, annee);
    },
    select: ({ data }) => data,
  });

  const payer = (data: Record<string, string>) => {
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
        query.invalidateQueries([QUERY_KEY.cotisations]);
        closeModal();
      }}
      onExit={closeModal}
      modalProps={{
        animation: false,
        centered: true,
      }}
      defaultValues={{
        resteAPayer,
      }}
    />
  );
};

type ModifierPaiementModalProps = {
  paiement: PaiementResource;
  closeModal: () => void;
};

export const ModifierPaiementModal: FC<ModifierPaiementModalProps> = ({ paiement, closeModal }) => {
  const query = useQueryClient();

  const modifier = (data: Record<string, string>) => {
    return paiementApi.update(paiement.id, {
      montant: data.montant,
    });
  };

  return (
    <PaiementForm
      onSave={modifier}
      title={`Modifier le paiement N° ${paiement.numero}`}
      defaultValues={{
        montant: paiement.montant,
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.paiements, QUERY_KEY.cotisations]);
        closeModal();
      }}
      onExit={closeModal}
      modalProps={{
        animation: false,
        centered: true,
      }}
    />
  );
};
