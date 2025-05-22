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
import { PaiementToolbar } from "./toolbar/PaiementToolbar";

const parseParams = (searchParams: URLSearchParams) => {
  const etat = searchParams.get("etat");

  return {
    etat: etat ? JSON.parse(etat) : null,

    search: searchParams.get("search"),
    page: searchParams.get("page") || "1",
    size: searchParams.get("size") || "10",
    sort: searchParams.get("sort") || "nom,asc",
  };
};

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    etat: selectHelper.getValueFromJson(filter.etat),

    search: filter.search,
    page: parseInt(filter.page) || 1,
    size: parseInt(filter.size) || 10,
    sort: filter.sort || "nom,asc",
  };
};

const RechercherPaiement: FC = () => {
  const search = useSearch();

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
        <PaiementToolbar
          isFetching={query.isFetching && !query.isLoading}
          nombreResultat={query.data?.meta.total}
          searchParams={searchParams}
        />

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
