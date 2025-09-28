import { FC } from "react";
import { roleApi } from "api";
import { QUERY_KEY } from "utils/constants";
import { DeleteConfirmationModal } from "pages/common";
import { RoleResource } from "types/auth.type";
import { useNavigate } from "react-router-dom";
import { LINKS } from "utils/links";

type ModalProps = {
  closeModal: () => void;
  role: RoleResource;
};

export const SupprimerRole: FC<ModalProps> = ({ closeModal, role }) => {
  const navigation = useNavigate();
  const deletePaiement = async () => {
    await roleApi.delete(role.id);
    navigation(LINKS.parametres.roles);
  };

  return <DeleteConfirmationModal closeModal={closeModal} onDelete={deletePaiement} query_key={QUERY_KEY.roles} />;
};
