import { FC } from "react";
import { paiementApi } from "api";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { ConfirmationModal } from "pages/common";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";

type PersonneCotisationModalProps = {
  personne: PersonneResource;
  paiement: PaiementResource;
  closeModal: () => void;
};

export const ValiderPaiementModal: FC<PersonneCotisationModalProps> = ({
  personne,
  paiement,
  closeModal,
}) => {
  const query = useQueryClient();

  const validerPaiement = async () => {
    await paiementApi.valider(paiement.id);
    closeModal();
    query.invalidateQueries([QUERY_KEY.paiements, personne.id]);
    query.invalidateQueries([QUERY_KEY.paiements]);
  };

  return (
    <ConfirmationModal
      onCancel={closeModal}
      onValide={validerPaiement}
      description="Voulez vous vraiment valider le paiement ?"
    />
  );
};
