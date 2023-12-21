import { useQuery } from "@tanstack/react-query";
import { montantCotisationApi } from "api";
import {
  Columns,
  DeleteConfirmationActions,
  ICONS,
  ListResult,
  PageHeader,
} from "pages/common";
import { FC } from "react";
import { QUERY_KEY } from "utils/constants";
import { useCrudModal } from "hooks/useCrudModal";
import { MontantCotisationResource } from "types/cotisation.type";

const ListCotisation: FC = () => {
  const { data: results } = useQuery({
    networkMode: "offlineFirst",
    queryKey: [QUERY_KEY.typesUnites],
    queryFn: () => montantCotisationApi.findAll<MontantCotisationResource>(),
  });

  const crudModal = useCrudModal<MontantCotisationResource>();

  const columns: Columns<MontantCotisationResource>[] = [
    {
      name: "type",
      label: "Type",
    },
    {
      name: "profil",
      label: "Profil",
    },
    {
      name: "montants",
      label: "Montants",
      Cell: ({ montants }) => <>{montants.map((e) => e.value).join(" , ")}</>,
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
        title="Cotisations"
        subtitle="Paramètrer montants des cotisations"
        icon={ICONS.cotisation}
        className="my-4"
      />

      <ListResult.Container isLoading={false}>
        <ListResult.Table<MontantCotisationResource>
          columns={columns}
          data={results?.data || []}
          headerClassName="bg-light"
        />
      </ListResult.Container>

      {/* {crudModal.isCreateOrUpdate && (
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
      )} */}
    </>
  );
};

export default ListCotisation;
