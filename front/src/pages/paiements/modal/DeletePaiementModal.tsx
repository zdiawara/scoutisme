import { FC } from "react";
import { paiementApi } from "api";
import { QUERY_KEY } from "utils/constants";
import { DeleteConfirmationModal } from "pages/common";
import { PaiementResource } from "types/personne.type";

type ModalProps = {
  closeModal: () => void;
  element: PaiementResource;
};

export const DeletePaiementModal: FC<ModalProps> = ({
  closeModal,
  element,
}) => {
  const deletePaiement = () => {
    return paiementApi.delete(element.id);
  };

  return (
    <DeleteConfirmationModal
      closeModal={closeModal}
      onDelete={deletePaiement}
      query_key={QUERY_KEY.paiements}
    />
  );
};
