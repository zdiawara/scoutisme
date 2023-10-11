import { FC } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Columns, ICONS, ListResult, PageHeader } from "pages/common";
import { RequestParam } from "types/request.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { LINKS } from "utils";

const ListInstance: FC = () => {
  /*   const { filter, setFilter } = useContext(FilterContext);
  const { search } = filter as OrganisationFilter; */

  const { data: organisations, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, {}],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      params.etat = params.etat === "tous" ? null : params.etat;
      return organisationApi.findAll<any>(params).then(() => {
        return {
          data: [
            {
              nom: "conférences nationales",
              frequence: "Tous les 3 ans",
              composition: "2 commissaires au compte ...",
            },
          ],
        };
      });
    },
  });

  const columns: Columns<any>[] = [
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
    },

    {
      name: "composition",
      label: "Composition",
    },

    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (fonction) => {
        return (
          <div className="text-end">
            <Button className="action-icon" variant="link">
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
          <Link to={LINKS.instances.create} className="btn btn-primary">
            Ajouter une instance
          </Link>
        }
      />

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<any>
          columns={columns}
          data={organisations?.data || []}
        />
      </ListResult.Container>
    </>
  );
};

export default ListInstance;
