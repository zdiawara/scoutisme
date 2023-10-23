import { FC } from "react";
import { Badge, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Columns, ICONS, ListResult, PageHeader } from "pages/common";
import { RequestParam } from "types/request.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { OrganisationResource } from "types/organisation.type";
import { LINKS } from "utils";

const ListEvent: FC = () => {
  const { data: organisations, isLoading } = useQuery({
    queryKey: [QUERY_KEY.events, {}],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      params.etat = params.etat === "tous" ? null : params.etat;
      return Promise.resolve({
        data: [],
      });
    },
  });

  const columns: Columns<OrganisationResource>[] = [
    {
      name: "nom",
      label: "Nom",
      Cell: (organisation) => {
        return (
          <Stack className="fw-semibold">
            <Link
              className="text-primary"
              to={LINKS.organisations.view(organisation.id)}
            >
              {organisation.nom}
            </Link>
            <span className="text-muted ">{organisation.nature.nom}</span>
          </Stack>
        );
      },
    },
    {
      name: "code",
      label: "Code",
    },

    {
      name: "type",
      label: "Type",
      Cell: ({ type }) => {
        return type?.nom ? <span>{type?.nom}</span> : null;
      },
    },
    {
      name: "parent",
      label: "Parent",
      Cell: ({ parent }) => {
        return parent?.nom ? (
          <Link
            className="text-primary fw-semibold"
            to={LINKS.organisations.view(parent.id)}
          >
            {parent.nom}
          </Link>
        ) : null;
      },
    },

    {
      name: "etat",
      label: "Etat",
      Cell: () => <Badge bg="success">Actif</Badge>,
    },
  ];

  return (
    <>
      <PageHeader.List
        title="Evenements"
        subtitle="Consulter et gérer les évènements"
        icon={ICONS.events}
        className="my-4"
        right={
          <Link to={LINKS.organisations.create} className="btn btn-primary">
            Ajouter un évènement
          </Link>
        }
      />
      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<OrganisationResource>
          columns={columns}
          data={organisations?.data || []}
          headerClassName="bg-light"
        />
      </ListResult.Container>
    </>
  );
};

export default ListEvent;
