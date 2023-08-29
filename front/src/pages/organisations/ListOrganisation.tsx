import { FC, useContext } from "react";
import { Badge, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Columns,
  ICONS,
  ListResult,
  PageFilter,
  PageHeader,
} from "pages/common";
import { FilterContext } from "context/FIlterContext";
import { OrganisationFilter, RequestParam } from "types/request.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { LINKS } from "utils";

const ListOrganisation: FC = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const { search } = filter as OrganisationFilter;

  const { data: organisations, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, filter],
    keepPreviousData: true,
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      params.etat = params.etat === "tous" ? null : params.etat;
      return organisationApi.findAll<OrganisationResource>(params);
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
        title="Organisations"
        subtitle="Consulter et gérer les organisations"
        icon={ICONS.organisation}
        className="my-4"
        right={
          <Link to={LINKS.organisations.create} className="btn btn-primary">
            <i className="uil-plus"></i> Ajouter une organisation
          </Link>
        }
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search
            onChange={(v) => {
              setFilter((prev) => ({ ...prev, search: v }));
            }}
            initialValue={search}
          />
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<OrganisationResource>
          columns={columns}
          data={organisations?.data || []}
        />
        {/* <ListResult.Paginate
          pageCount={2}
          onPageChange={() => {}}
          pageActive={1}
        /> */}
      </ListResult.Container>
    </>
  );
};

export default ListOrganisation;
