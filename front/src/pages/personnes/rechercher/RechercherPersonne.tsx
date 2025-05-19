// import FeatherIcon from "feather-icons-react";
import { useQuery } from "@tanstack/react-query";
import { personneApi } from "api";
import { ListGroup, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { PersonneResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { ListResult } from "pages/common";
import { Header } from "layout/Header";
import { useMemo } from "react";
import { PersonneToolbar } from "./toolbar/PersonneToolbar";
import { selectHelper } from "utils/functions";
import { PersonneItem } from "./personne/PersonneItem";
import { RechercherPersonneActions } from "./action/RechercherPersonneActions";

const parseParams = (searchParams: URLSearchParams) => {
  const ville = searchParams.get("ville");
  const genre = searchParams.get("genre");
  const fonction = searchParams.get("fonction");
  const organisation = searchParams.get("organisation");

  return {
    // type: selectHelper.getValue(filter.type),
    // etat: selectHelper.getValue(filter.etat),
    // niveauFormationId: selectHelper.getValue(filter.niveauFormation),
    ville: ville ? JSON.parse(ville) : null,
    genre: genre ? JSON.parse(genre) : null,
    fonction: fonction ? JSON.parse(fonction) : null,
    organisation: organisation ? JSON.parse(organisation) : null,
    // perimetres: filter.inclureSousOrganisation
    //   ? filter?.perimetres?.join(";")
    //   : undefined,
    search: searchParams.get("search"),
    page: searchParams.get("page") || "1",
    size: searchParams.get("size") || "10",
    sort: searchParams.get("sort") || "nom,asc",
  };
};

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    // type: selectHelper.getValue(filter.type),
    // etat: selectHelper.getValue(filter.etat),
    // niveauFormationId: selectHelper.getValue(filter.niveauFormation),
    villeId: filter.ville
      ? selectHelper.getValue(JSON.parse(filter.ville))
      : null,
    genreId: filter.genre
      ? selectHelper.getValue(JSON.parse(filter.genre))
      : null,
    fonctionId: filter.fonction
      ? selectHelper.getValue(JSON.parse(filter.fonction))
      : null,
    organisationId: filter.organisation
      ? selectHelper.getValue(JSON.parse(filter.organisation))
      : null,
    // perimetres: "region;groupe;unite",
    search: filter.search,
    page: parseInt(filter.page) || 1,
    size: parseInt(filter.size) || 10,
    sort: filter.sort || "nom,asc",
  };
};

const searchPersonne = ({ queryKey }: any) => {
  return personneApi.findAll<PersonneResource>(buildRequestParams(queryKey[1]));
};

const RechercherPersonne = () => {
  //   const { userDroit } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  const params = useMemo(() => {
    return parseParams(searchParams);
  }, [searchParams]);

  const query = useQuery({
    queryKey: [QUERY_KEY.personnes, queryParams],
    keepPreviousData: true,
    queryFn: searchPersonne,
  });

  const { data } = query;

  return (
    <>
      <Header
        title="Personnes"
        right={
          <RechercherPersonneActions params={buildRequestParams(queryParams)} />
        }
      />

      <ListGroup className="mt-4">
        <PersonneToolbar
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
        ) : data?.data?.length ? (
          data?.data?.map((personne) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-start px-2 px-sm-4"
              key={personne.id}
            >
              <PersonneItem personne={personne} />
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="fw-light text-center">
            Aucune personne trouvée
          </ListGroup.Item>
        )}
      </ListGroup>
      {data?.meta && (
        <ListResult.Paginate
          pageCount={data.meta.total_page}
          pageActive={parseInt(params.page) - 1}
          total={data.meta.total}
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

export default RechercherPersonne;
