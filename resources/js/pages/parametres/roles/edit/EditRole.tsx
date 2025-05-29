import { FC } from "react";
import { roleApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { RoleResource } from "types/auth.type";
import { roleConverter } from "./RoleUtils";
import { RoleForm } from "./RoleForm";

type EditRoleProps = {
  closeModal: () => void;
  role?: RoleResource;
};

/**
 * Modifier une fonction
 * @param param0
 * @returns
 */
export const EditRole: FC<EditRoleProps> = ({ closeModal, role }) => {
  const queryClient = useQueryClient();

  const saveRole = (data: Record<string, any>) => {
    const body = {
      ...roleConverter.toBody(data),
      fonctionnalites: data.fonctionnalites,
    };
    if (role?.id) {
      return roleApi.update(role.id, body);
    }
    return roleApi.create(data);
  };

  return (
    <RoleForm
      onSave={saveRole}
      title={`${role?.id ? "Modifier" : "Ajouter"} un rôle`}
      defaultValues={role?.id ? roleConverter.toInput(role) : {}}
      onSuccess={() => {
        queryClient.invalidateQueries(["roles"]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};
