import { useQuery } from "@tanstack/react-query";
import { roleApi } from "api";
import { useCrudModal } from "hooks";
import {
  Columns,
  DeleteConfirmationActions,
  ICONS,
  StaticTable,
} from "pages/common";
import { Button } from "react-bootstrap";
import { RoleResource } from "types/auth.type";
import { CreateRoleModal } from "./roles/CreateRoleModal";
import { HabilitationModal } from "./roles/HabilitationModal";

const searchByCriteres = (term: string, roles: RoleResource[]) => {
  return roles.filter(({ code, nom, perimetres }) =>
    [...perimetres, code, nom].join(" ").match(new RegExp(term, "gi"))
  );
};

export const ListRole = () => {
  const query = useQuery({
    queryKey: ["roles"],
    networkMode: "offlineFirst",
    queryFn: () => roleApi.findAll<RoleResource>(),
    select: ({ data }) => data,
  });

  const crudModal = useCrudModal<RoleResource>();
  const habilitationModal = useCrudModal<RoleResource>();

  const columns: Columns<RoleResource>[] = [
    {
      name: "nom",
      label: "Nom",
      Cell: ({ nom }) => {
        return <span className="text-primary fw-semibold">{nom}</span>;
      },
    },
    {
      name: "code",
      label: "Code",
    },

    {
      name: "perimetre",
      label: "Périmètre",
      Cell: ({ perimetres }) => {
        if (perimetres.length) {
          return perimetres.map((e) => e.toUpperCase()).join(" , ");
        }
        return <span>-</span>;
      },
    },

    {
      name: "habilitations",
      label: "Habilitations",
      Cell: (role) => {
        return (
          <Button
            size="sm"
            variant="light"
            onClick={habilitationModal.onUpdate(role)}
          >
            voir
          </Button>
        );
      },
    },

    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (element) =>
        element.code !== "admin" ? (
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
          icon: ICONS.organisation,
          label: "Rôles",
          description: "Liste des rôles disponibles",
        }}
        data={query.data}
        onSearch={searchByCriteres}
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
        <CreateRoleModal
          closeModal={crudModal.reset}
          role={crudModal.action?.element}
        />
      )}

      {habilitationModal.isCreateOrUpdate && (
        <HabilitationModal
          closeModal={habilitationModal.reset}
          role={habilitationModal.action?.element!}
        />
      )}
    </>
  );
};
