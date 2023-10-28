import { useQuery } from "@tanstack/react-query";
import { typeOrganisationApi } from "api";
import {
  Columns,
  DeleteConfirmationActions,
  ICONS,
  ListResult,
  PageHeader,
} from "pages/common";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { QUERY_KEY } from "utils/constants";
import { TypeUniteModal } from "./TypeUniteModal";
import { TypeOrganisationResource } from "types/organisation.type";
import { DeleteTypeUniteModal } from "./DeleteTypeUniteModal";
import { useCrudModal } from "hooks/useCrudModal";

const ListTypeUnite: FC = () => {
  const { data: results } = useQuery({
    networkMode: "offlineFirst",
    queryKey: [QUERY_KEY.typesUnites],
    queryFn: () => typeOrganisationApi.findAll<TypeOrganisationResource>(),
  });

  const crudModal = useCrudModal<TypeOrganisationResource>();

  const columns: Columns<TypeOrganisationResource>[] = [
    {
      name: "code",
      label: "Code",
    },
    {
      name: "nom",
      label: "Nom",
      Cell: ({ nom }) => {
        return <span className="text-primary fw-semibold">{nom}</span>;
      },
    },
    {
      name: "membre",
      label: "Membre",
    },
    {
      name: "position",
      label: "Position",
    },
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (element) => (
        <DeleteConfirmationActions
          element={element}
          onDelete={crudModal.onDelete}
          onUpdate={crudModal.onUpdate}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader.List
        title="Types d'unités"
        subtitle="Consulter et gérer les types d'unités"
        icon={ICONS.type_unite}
        className="my-4"
        right={
          <Button onClick={crudModal.onCreate()}>
            Ajouter un type d'unité
          </Button>
        }
      />

      <ListResult.Container isLoading={false}>
        <ListResult.Table<TypeOrganisationResource>
          columns={columns}
          data={results?.data || []}
          headerClassName="bg-light"
        />
      </ListResult.Container>

      {crudModal.isCreateOrUpdate && (
        <TypeUniteModal
          closeModal={crudModal.reset}
          selected={crudModal.action?.element!}
        />
      )}

      {crudModal.isDelete && (
        <DeleteTypeUniteModal
          element={crudModal.action?.element!}
          closeModal={crudModal.reset}
        />
      )}
    </>
  );
};

export default ListTypeUnite;
