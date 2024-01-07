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
import { MontantFormatText } from "components";
import { Badge } from "react-bootstrap";

const TYPES: Record<string, string> = {
  direction_conseil_national: "Direction du conseil national",
  direction_equipe_nationale: "Direction de l'équipe nationale",
  direction_groupe: "Direction d'un groupe",
  direction_region: "Direction d'une région",
  direction_unite: "Direction d'une unité",
  scout: "Scout",
};

const PROFILS: Record<string, string> = {
  tous: "Tout le monde",
  type_organisation: "Par type d'organisation",
};

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
      Cell: ({ type }) => <span className="text-primary">{TYPES[type]}</span>,
    },
    {
      name: "montants",
      label: "Montants",
      Cell: ({ montants }) => (
        <>
          {montants
            .map((e) => e.value)
            .map((m, i) => (
              <Badge key={i} className="me-2" bg="primary">
                <MontantFormatText value={m} withDevise />
              </Badge>
            ))}
        </>
      ),
    },
    {
      name: "profil",
      label: "Profil",
      Cell: ({ profil }) => <span>{PROFILS[profil]}</span>,
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
        title="Montant cotisations"
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
    </>
  );
};

export default ListCotisation;
