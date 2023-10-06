import { useQuery } from "@tanstack/react-query";
import { refFormationApi } from "api";
import { Columns, ICONS, ListResult, PageHeader } from "pages/common";
import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { QUERY_KEY } from "utils/constants";
import { RefFormationResource } from "types/organisation.type";
import { RefFormationModal } from "./RefFormationModal";

const ListRefFormation: FC = () => {
  const { data: refFormations } = useQuery({
    queryKey: [QUERY_KEY.refFormations],
    networkMode: "offlineFirst",
    queryFn: () => {
      return refFormationApi.findAll<RefFormationResource>();
    },
  });

  const [action, setAction] = useState<
    | {
        code: "create" | "edit";
        selected?: RefFormationResource;
      }
    | undefined
  >();

  const columns: Columns<RefFormationResource>[] = [
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
        title="Réf. des formations"
        subtitle="Consulter et gérer le référentiel des formations"
        icon={ICONS.formation}
        className="my-4"
        right={
          <Button onClick={() => setAction({ code: "create" })}>
            <i className="uil-plus"></i> Ajouter une formation
          </Button>
        }
      />

      <ListResult.Container isLoading={false}>
        <ListResult.Table<RefFormationResource>
          columns={columns}
          data={refFormations?.data || []}
        />
      </ListResult.Container>
      {action && (
        <RefFormationModal
          closeModal={() => setAction(undefined)}
          refFormation={action.selected}
        />
      )}
    </>
  );
};

export default ListRefFormation;
