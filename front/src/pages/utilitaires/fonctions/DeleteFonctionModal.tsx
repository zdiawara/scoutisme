import { FC } from "react";
import { fonctionApi } from "api";
import { QUERY_KEY } from "utils/constants";
import { DeleteConfirmationModal } from "pages/common";
import { FonctionResource } from "types/personne.type";

type ModalProps = {
  closeModal: () => void;
  element: FonctionResource;
};

export const DeleteFonctionModal: FC<ModalProps> = ({
  closeModal,
  element,
}) => {
  const deleteTypeUnite = () => {
    return fonctionApi.delete(element.id);
  };

  return (
    <DeleteConfirmationModal
      closeModal={closeModal}
      onDelete={deleteTypeUnite}
      query_key={QUERY_KEY.fonctions}
    />
  );
};
