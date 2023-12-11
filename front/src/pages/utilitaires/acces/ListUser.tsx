import { useQuery } from "@tanstack/react-query";
import { userApi } from "api";
import { useCrudModal } from "hooks";
import {
  Columns,
  DeleteConfirmationActions,
  ICONS,
  StaticTable,
} from "pages/common";
import { UserResource } from "types/auth.type";
import { CreateUserModal } from "./users/CreateUserModal";
import { Badge, Button } from "react-bootstrap";

export const ListUser = () => {
  const query = useQuery({
    queryKey: ["users"],
    networkMode: "offlineFirst",
    queryFn: () => userApi.findAll<UserResource>(),
    select: ({ data }) => data,
  });

  const crudModal = useCrudModal<UserResource>();

  const columns: Columns<UserResource>[] = [
    {
      name: "name",
      label: "Nom",
      Cell: ({ name }) => {
        return <span className="text-primary fw-semibold">{name}</span>;
      },
    },
    {
      name: "email",
      label: "Email",
    },

    {
      name: "role",
      label: "Rôle",
      Cell: ({ role }) => {
        return <span className="text-primary fw-semibold">{role.nom}</span>;
      },
    },

    {
      name: "etat",
      label: "Etat",
      Cell: () => <Badge bg="success">Actif</Badge>,
    },

    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (element) =>
        element.role.code !== "admin" ? (
          <DeleteConfirmationActions
            element={element}
            onDelete={crudModal.onDelete}
            onUpdate={crudModal.onUpdate}
          />
        ) : null,
    },
  ];

  return (
    <>
      <StaticTable
        header={{
          icon: ICONS.personne,
          label: "Utilisateurs",
          description: "Les personnes habilitées à accèder à l'application",
        }}
        data={query.data}
        //onSearch={searchByCriteres}
        columns={columns}
        isLoading={query.isLoading}
        error={query.error}
        actions={
          <Button
            variant="secondary"
            className="ms-1"
            onClick={crudModal.onCreate()}
          >
            Ajouter
          </Button>
        }
      />

      {crudModal.isCreateOrUpdate && (
        <CreateUserModal
          closeModal={crudModal.reset}
          user={crudModal.action?.element}
        />
      )}
    </>
  );
};
