import { useQuery } from "@tanstack/react-query";
import { organisationApi } from "api";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { selectHelper } from "utils/functions";
import { RechercherOrganisationActions } from "./action/RechercherOrganisationActions";
import { Header } from "layout/Header";
import { ListGroup, Spinner } from "react-bootstrap";
import { OrganisationToolbar } from "./toolbar/OrganisationToolbar";
import { OrganisationItem } from "./organisation/OrganisationItem";
import { ListResult } from "pages/common";

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

const RechercherOrganisation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  const query = useQuery({
    queryKey: [QUERY_KEY.organisations, queryParams],
    keepPreviousData: true,
    queryFn: searchOrganisations,
  });

  const params = useMemo(() => parseParams(searchParams), [searchParams]);

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
        <OrganisationToolbar
          isFetching={query.isFetching && !query.isLoading}
          nombreResultat={query.data?.meta.total}
          searchParams={params}
        />

        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <Spinner className="me-1" size="sm" animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className="fw-light">chargement ...</span>
          </ListGroup.Item>
        ) : organisations?.length ? (
          organisations?.map((organisation) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-start px-2 px-sm-4"
              key={organisation.id}
            >
              <OrganisationItem organisation={organisation} />
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="fw-light text-center">
            Aucune personne trouvée
          </ListGroup.Item>
        )}
      </ListGroup>

      {meta && (
        <ListResult.Paginate
          pageCount={meta.total_page}
          pageActive={parseInt(params.page) - 1}
          total={meta.total}
          onPageChange={(pageNumber) => {
            setSearchParams(
              (prevParams) => {
                const params = new URLSearchParams(prevParams);
                params.set("page", (pageNumber + 1).toString());
                return params;
              },
              { replace: true }
            );

            window.scroll({ top: 0 });
          }}
        />
      )}
    </>
  );
};

export default RechercherOrganisation;
