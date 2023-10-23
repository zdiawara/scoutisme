import { FC, useContext, useState } from "react";
import { Badge, Button, Col, Stack } from "react-bootstrap";
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
import { FilterOrganisation } from "./form/FilterOrganisation";
import { selectHelper } from "utils/functions";

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    natureId: selectHelper.getValue(filter.nature),
    typeId: selectHelper.getValue(filter.type),
    etat: selectHelper.getValue(filter.etat),
    search: filter.search,
    page: filter.page,
    size: filter.size,
  };
};

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

const ListOrganisation: FC = () => {
  const filterContext = useContext(FilterContext);
  const filter = filterContext.filter as OrganisationFilter;
  const [show, setShow] = useState<boolean>(false);

  const { data: result, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, filter],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return organisationApi.findAll<OrganisationResource>(
        buildRequestParams(queryKey[1] as RequestParam)
      );
    },
  });

  return (
    <>
      <PageHeader.List
        title="Organisations"
        subtitle="Consulter et gérer les organisations"
        icon={ICONS.organisation}
        className="my-4"
        right={
          <Link to={LINKS.organisations.create} className="btn btn-primary">
            Ajouter une organisation
          </Link>
        }
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search
            onChange={(v) => {
              filterContext.setFilter((prev) => ({ ...prev, search: v }));
            }}
            initialValue={filter.search}
          />
        </Col>
        <Col>
          <div className="text-sm-end">
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => {
                setShow(true);
              }}
            >
              <i className="uil-filter"></i> Filtre avancé
            </Button>
          </div>
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<OrganisationResource>
          columns={columns}
          data={result?.data || []}
          headerClassName="bg-light"
        />
        {result?.data && (
          <ListResult.Paginate
            pageCount={result.meta.total_page}
            pageActive={result.meta.page - 1}
            total={result.meta.total}
            onPageChange={(page) => {
              filterContext.setFilter((old) => ({ ...old, page: page + 1 }));
            }}
          />
        )}
      </ListResult.Container>

      <FilterOrganisation
        applyFiler={(data) => {
          filterContext.setFilter((prev) => ({ ...prev, ...data, page: 1 }));
          setShow(false);
        }}
        defaultValues={filterContext.filter}
        show={show}
        close={() => setShow(false)}
      />
    </>
  );
};

export default ListOrganisation;
