import { useQuery } from "@tanstack/react-query";
import { typeOrganisationApi } from "api";
import { Columns, ICONS, ListResult, PageHeader } from "pages/common";
import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { QUERY_KEY } from "utils/constants";
import { TypeUniteModal } from "./TypeUniteModal";
import { TypeOrganisationResource } from "types/organisation.type";

type IAction = {
  code: "create" | "edit";
  selected?: TypeOrganisationResource;
};

const ListTypeUnite: FC = () => {
  const { data: results } = useQuery({
    networkMode: "offlineFirst",
    queryKey: [QUERY_KEY.typesUnites],
    queryFn: () => typeOrganisationApi.findAll<TypeOrganisationResource>(),
  });

  const [action, setAction] = useState<IAction | undefined>();

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
      name: "actions",
      label: "Actions",
      Cell: (selected) => {
        return (
          <Button
            className="action-icon"
            variant="link"
            onClick={() => setAction({ code: "edit", selected })}
          >
            <i className="uil-edit-alt fs-4 text-primary"></i>
          </Button>
        );
      },
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
          <Button onClick={() => setAction({ code: "create" })}>
            <i className="uil-plus"></i> Ajouter un type d'unité
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
      {action && (
        <TypeUniteModal
          closeModal={() => setAction(undefined)}
          selected={action.selected}
        />
      )}
    </>
  );
};

export default ListTypeUnite;
