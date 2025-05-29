import { useQuery } from "@tanstack/react-query";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { selectHelper } from "utils/functions";
import { RechercherOrganisationActions } from "./action/RechercherOrganisationActions";
import { Header } from "layout/Header";
import { ListGroup, Spinner } from "react-bootstrap";
import { ListResult } from "pages/common";
import { SearchToolbar } from "pages/common/toolbar";
import { useSearch } from "hooks/useSearch";
import useToggle from "hooks/useToggle";
import { FilterOrganisation } from "./toolbar/FilterOrganisation";
import { ListOrganisation } from "./organisation/ListOrganisation";

const parseParams = (searchParams: URLSearchParams) => {
  const type = searchParams.get("type");
  const nature = searchParams.get("nature");

  return {
    type: type ? JSON.parse(type) : null,
    nature: nature ? JSON.parse(nature) : null,
    search: searchParams.get("search"),
    page: searchParams.get("page") || "1",
    size: searchParams.get("size") || "10",
    sort: searchParams.get("sort") || "nom,asc",
  };
};

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    typeId: filter.type ? selectHelper.getValue(JSON.parse(filter.type)) : null,
    natureId: filter.nature
      ? selectHelper.getValue(JSON.parse(filter.nature))
      : null,
    search: filter.search,
    page: parseInt(filter.page) || 1,
    size: parseInt(filter.size) || 10,
    sort: filter.sort || "nom,asc",
  };
};

const searchOrganisations = ({ queryKey }: any) => {
  return organisationApi.findAll<OrganisationResource>(
    buildRequestParams(queryKey[1])
  );
};

const TRIES = [
  {
    label: "Nom croissant",
    code: "nom,asc",
  },
  {
    label: "Nom décroissant",
    code: "nom,desc",
  },
];

const RechercherOrganisation = () => {
  const [showFilter, toggleFilter] = useToggle();
  const search = useSearch();

  const queryParams = Object.fromEntries(search.searchParams.entries());

  const params = parseParams(search.searchParams);

  const query = useQuery({
    queryKey: [QUERY_KEY.organisations, queryParams],
    keepPreviousData: true,
    queryFn: searchOrganisations,
  });

  const organisations = query.data?.data;
  const meta = query.data?.meta;

  return (
    <>
      <Header
        title="Organisations"
        right={
          <RechercherOrganisationActions
            params={buildRequestParams(queryParams)}
          />
        }
      />

      <ListGroup className="mt-4">
        <SearchToolbar
          tries={TRIES}
          isFetching={query.isFetching && !query.isLoading}
          toggleFilter={toggleFilter}
          searchParams={search.searchParams}
          nombreResultat={meta?.total}
        />

        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <Spinner className="me-1" size="sm" animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className="fw-light">chargement ...</span>
          </ListGroup.Item>
        ) : (
          <ListOrganisation organisations={organisations} />
        )}
      </ListGroup>

      {meta && (
        <ListResult.Paginate
          pageCount={meta.total_page}
          pageActive={parseInt(params.page) - 1}
          total={meta.total}
          onPageChange={search.setPageNumber}
        />
      )}

      {showFilter && (
        <FilterOrganisation
          applyFiler={(data) => {
            search.onChangeFilter(data);
            toggleFilter();
          }}
          defaultValues={search.searchParams}
          close={toggleFilter}
          show
        />
      )}
    </>
  );
};

export default RechercherOrganisation;
