import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Columns, ICONS, ListResult, PageHeader } from "pages/common";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { LINKS } from "utils";
import { instanceApi } from "api";
import { View } from "components";
import { InstanceResource } from "types/events.type";
import { InstanceModal } from "./InstanceModal";

const ListInstance: FC = () => {
  /*   const { filter, setFilter } = useContext(FilterContext);
  const { search } = filter as OrganisationFilter; */

  const { data: organisations, isLoading } = useQuery({
    queryKey: [QUERY_KEY.instances, {}],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: () => {
      return instanceApi.findAll<any>();
    },
  });

  const [action, setAction] = useState<
    | {
        code: "create" | "edit";
        item?: InstanceResource;
      }
    | undefined
  >();

  const columns: Columns<InstanceResource>[] = [
    {
      name: "nom",
      label: "Nom",
      Cell: (organisation) => {
        return (
          <Link
            className="text-primary fw-semibold"
            to={LINKS.organisations.view(organisation.id)}
          >
            {organisation.nom}
          </Link>
        );
      },
    },
    {
      name: "frequence",
      label: "Fréquence",
      Cell: () => <View.Empty />,
    },

    {
      name: "compositions",
      label: "Compositions",
      Cell: ({ compositions }) => {
        return (
          <>
            {compositions![0].quota}&nbsp;
            {compositions![0].fonction?.label}&nbsp;...
          </>
        );
      },
    },

    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (item) => {
        return (
          <div className="text-end">
            <Button
              className="action-icon"
              variant="link"
              onClick={() => setAction({ code: "edit", item })}
            >
              <i className="uil-edit-alt fs-4 text-primary"></i>
            </Button>
            {/* <Button variant="link" className="action-icon">
                <i className="mdi mdi-delete fs-4 text-danger"></i>
              </Button> */}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader.List
        title="Instances"
        subtitle="Consulter et gérer les instances"
        icon={ICONS.instance}
        className="my-4"
        right={
          <Button
            onClick={() => setAction({ code: "create" })}
            className="btn btn-primary"
          >
            Ajouter une instance
          </Button>
        }
      />

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<any>
          columns={columns}
          data={organisations?.data || []}
          headerClassName="bg-light"
        />
      </ListResult.Container>

      {action && (
        <InstanceModal
          closeModal={() => setAction(undefined)}
          selected={action.item}
        />
      )}
    </>
  );
};

export default ListInstance;
