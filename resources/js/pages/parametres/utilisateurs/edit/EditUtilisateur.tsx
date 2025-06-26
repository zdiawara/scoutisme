import { FC } from "react";
import { userApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { UserResource } from "types/auth.type";
import { UtilisateurForm } from "./UtilisateurForm";
import { SelectItem } from "types/form.type";
import { utilisateurConverter } from "./UtilisateurUtils";

type EditUtilisateurProps = {
  closeModal: () => void;
  user?: UserResource;
};

/**
 * Modifier une fonction
 * @param param0
 * @returns
 */
export const EditUtilisateur: FC<EditUtilisateurProps> = ({ closeModal, user }) => {
  const query = useQueryClient();

  const save = (data: Record<string, string | SelectItem>) => {
    const body = utilisateurConverter.toBody(data);
    if (user?.id) {
      return userApi.update(user.id, body);
    }
    return userApi.create(body);
  };

  return (
    <UtilisateurForm
      onSave={save}
      title={`${user?.id ? "Modifier" : "Ajouter"} un utilisateur`}
      //subtitle="Rôle occupé par les utilisateurs de l'application"
      defaultValues={user?.id ? utilisateurConverter.toInput(user) : {}}
      onSuccess={() => {
        query.invalidateQueries(["users"]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
