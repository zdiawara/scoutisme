import { FC } from "react";
import { typeOrganisationApi } from "api";
import { TypeOrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { DeleteConfirmationModal } from "pages/common";

type ModalProps = {
  closeModal: () => void;
  element: TypeOrganisationResource;
};

export const DeleteTypeUniteModal: FC<ModalProps> = ({
  closeModal,
  element,
}) => {
  const deleteTypeUnite = () => {
    return typeOrganisationApi.delete(element.id);
  };

  return (
    <DeleteConfirmationModal
      closeModal={closeModal}
      onDelete={deleteTypeUnite}
      query_key={QUERY_KEY.typesUnites}
    />
  );
};
