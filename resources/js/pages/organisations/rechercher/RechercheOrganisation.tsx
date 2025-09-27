import { useQuery } from "@tanstack/react-query";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { buildPerimetres, selectHelper } from "utils/functions";
import { Header } from "layout/Header";
import { ListGroup } from "react-bootstrap";
import { ListResult } from "pages/common";
import { SearchToolbar } from "pages/common/toolbar";
import { useSearch } from "hooks/useSearch";
import useToggle from "hooks/useToggle";
import { FilterOrganisation } from "./toolbar/FilterOrganisation";
import { ListOrganisation } from "./organisation/ListOrganisation";
import { useAuth } from "hooks/useAuth";
import { LoaderSpinner } from "components/loader";

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

const buildRequestParams = (filter: Record<string, string>, organisation?: OrganisationResource) => {
  const data = {
    typeId: selectHelper.getValueFromJson(filter.type),
    natureId: selectHelper.getValueFromJson(filter.nature),
    search: filter.search,
    page: parseInt(filter.page) || 1,
    size: parseInt(filter.size) || 10,
    sort: filter.sort || "nom,asc",
  } as Record<string, string | number>;

  if (organisation) {
    data.perimetres = buildPerimetres(organisation.nature.code).join(";");
    data.organisationId = organisation.id;
  }

  return data;
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
  const { user } = useAuth();

  const query = useQuery({
    queryKey: [QUERY_KEY.organisations, queryParams],
    keepPreviousData: true,
    queryFn: ({ queryKey }: any) => {
      return organisationApi.findAll<OrganisationResource>(
        buildRequestParams(queryKey[1], user?.personne?.organisation)
      );
    },
  });

  const organisations = query.data?.data;
  const meta = query.data?.meta;

  return (
    <>
      <Header title="Organisations" />

      <ListGroup className="mt-4">
        <SearchToolbar
          tries={TRIES}
          isFetching={query.isFetching && !query.isLoading}
          toggleFilter={toggleFilter}
          searchParams={params}
          nombreResultat={meta?.total}
        />

        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
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
          defaultValues={params}
          close={toggleFilter}
          show
        />
      )}
    </>
  );
};

export default RechercherOrganisation;
