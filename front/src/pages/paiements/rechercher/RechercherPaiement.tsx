import { paiementApi } from "api";
import { ListResult } from "pages/common";
import { FC } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { RequestParam } from "types/request.type";
import { QUERY_KEY } from "utils/constants";
import { selectHelper } from "utils/functions";
import { Header } from "layout/Header";
import { RechercherPaiementActions } from "./action/RechercherPaiementActions";
import { useSearch } from "hooks/useSearch";
import { ListPaiement } from "./paiement/ListPaiement";
import { useQuery } from "@tanstack/react-query";
import { SearchToolbar } from "pages/common/toolbar";
import useToggle from "hooks/useToggle";
import { FilterPaiement } from "../form";

const parseParams = (searchParams: URLSearchParams) => {
  const etat = searchParams.get("etat");

  return {
    etat: etat ? JSON.parse(etat) : null,

    search: searchParams.get("search"),
    page: searchParams.get("page") || "1",
    size: searchParams.get("size") || "10",
    sort: searchParams.get("sort") || "created_at,asc",
  };
};

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    etat: selectHelper.getValueFromJson(filter.etat),

    search: filter.search,
    page: parseInt(filter.page) || 1,
    size: parseInt(filter.size) || 10,
    sort: filter.sort || "created_at,asc",
  };
};

const ACTIONS = [
  {
    label: "Date soumission croissante",
    code: "created_at,asc",
  },
  {
    label: "Date soumission décroissante",
    code: "created_at,desc",
  },
];

const RechercherPaiement: FC = () => {
  const search = useSearch();

  const [showFilter, toggleFilter] = useToggle();

  const searchParams = parseParams(search.searchParams);

  const query = useQuery({
    queryKey: [QUERY_KEY.paiements, search.queryParams],
    keepPreviousData: true,
    queryFn: ({ queryKey }) =>
      paiementApi.findAll<PaiementResource>(
        buildRequestParams(queryKey[1] as RequestParam)
      ),
  });

  const paiements = query.data?.data;
  const meta = query.data?.meta;

  return (
    <>
      <Header
        title="Paiements"
        right={
          <RechercherPaiementActions
            params={buildRequestParams(search.queryParams)}
          />
        }
      />

      <ListGroup className="mt-4">
        <SearchToolbar
          tries={ACTIONS}
          isFetching={query.isFetching && !query.isLoading}
          toggleFilter={toggleFilter}
          searchParams={searchParams}
          nombreResultat={meta?.total}
        />
        {showFilter && (
          <FilterPaiement
            applyFiler={(data) => {
              search.onChangeFilter(data);
              toggleFilter();
            }}
            defaultValues={searchParams}
            close={toggleFilter}
            show
          />
        )}

        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <Spinner className="me-1" size="sm" animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className="fw-light">chargement ...</span>
          </ListGroup.Item>
        ) : (
          <ListPaiement paiements={paiements} />
        )}
      </ListGroup>
      {meta && (
        <ListResult.Paginate
          pageCount={meta.total_page}
          pageActive={parseInt(searchParams.page) - 1}
          total={meta.total}
          onPageChange={search.setPageNumber}
        />
      )}
    </>
  );
};

export default RechercherPaiement;
