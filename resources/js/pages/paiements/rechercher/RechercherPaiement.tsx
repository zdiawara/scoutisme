import { paiementApi } from "api";
import { ListResult } from "pages/common";
import { FC } from "react";
import { ListGroup } from "react-bootstrap";
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
import { LoaderSpinner } from "components/loader";
import { SelectItem } from "types/form.type";

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

interface RequestFilter {
  etat?: string | SelectItem;
  search?: string;
  page?: string;
  size?: string;
  sort?: string;
}

const buildRequestParams = (filter: RequestFilter) => {
  return {
    etat: selectHelper.getValueFromJson(filter.etat),

    search: filter.search,
    page: parseInt(filter.page as string) || 1,
    size: parseInt(filter.size as string) || 10,
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

  const query = useQuery({
    queryKey: [QUERY_KEY.paiements, search.queryParams],
    keepPreviousData: true,
    queryFn: ({ queryKey }) => paiementApi.findAll<PaiementResource>(buildRequestParams(queryKey[1] as RequestParam)),
  });

  const applyFilter = (data: any) => {
    search.onChangeFilter(data);
    toggleFilter();
  };

  const paiements = query.data?.data;
  const meta = query.data?.meta;
  const searchParams = parseParams(search.searchParams);

  return (
    <>
      <Header title="Paiements" right={<RechercherPaiementActions />} />

      <ListGroup className="mt-4">
        <SearchToolbar
          tries={ACTIONS}
          isFetching={query.isFetching && !query.isLoading}
          toggleFilter={toggleFilter}
          searchParams={searchParams}
          nombreResultat={meta?.total}
        />

        {showFilter && (
          <FilterPaiement applyFiler={applyFilter} defaultValues={searchParams} close={toggleFilter} show />
        )}

        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
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
