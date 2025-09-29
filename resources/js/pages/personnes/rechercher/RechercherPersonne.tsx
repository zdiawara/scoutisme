// import FeatherIcon from "feather-icons-react";
import { useQuery } from "@tanstack/react-query";
import { personneApi } from "api";
import { ListGroup } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { ListResult } from "pages/common";
import { Header } from "layout/Header";
import { buildPerimetres, selectHelper } from "utils/functions";
import { RechercherPersonneActions } from "./action/RechercherPersonneActions";
import { useAuth } from "hooks";
import { useSearch } from "hooks/useSearch";
import useToggle from "hooks/useToggle";
import { LoaderSpinner } from "components/loader";
import { ListPersonne } from "./personne/ListPersonne";
import { FilterPersonne } from "../FilterPersonne";
import { SearchToolbar } from "pages/common/toolbar";

const parseParams = (searchParams: URLSearchParams) => {
  const ville = searchParams.get("ville");
  const genre = searchParams.get("genre");
  const fonction = searchParams.get("fonction");
  const organisation = searchParams.get("organisation");
  const etatCotisation = searchParams.get("etatCotisation");
  const niveauFormation = searchParams.get("niveauFormation");
  const typePersonne = searchParams.get("typePersonne");

  return {
    etatCotisation: etatCotisation ? JSON.parse(etatCotisation) : null,
    typePersonne: typePersonne ? JSON.parse(typePersonne) : null,
    ville: ville ? JSON.parse(ville) : null,
    genre: genre ? JSON.parse(genre) : null,
    niveauFormation: niveauFormation ? JSON.parse(niveauFormation) : null,
    fonction: fonction ? JSON.parse(fonction) : null,
    organisation: organisation ? JSON.parse(organisation) : null,
    search: searchParams.get("search"),
    age: searchParams.get("age"),
    page: searchParams.get("page") || "1",
    size: searchParams.get("size") || "10",
    sort: searchParams.get("sort") || "nom,asc",
  };
};

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    villeId: selectHelper.getValueFromJson(filter.ville),
    etatCotisation: selectHelper.getValueFromJson(filter.etatCotisation),
    typePersonne: selectHelper.getValueFromJson(filter.typePersonne),
    genreId: selectHelper.getValueFromJson(filter.genre),
    fonctionId: selectHelper.getValueFromJson(filter.fonction),
    organisationId: selectHelper.getValueFromJson(filter.organisation),
    niveauFormationId: selectHelper.getValueFromJson(filter.niveauFormation),
    search: filter.search,
    page: parseInt(filter.page) || 1,
    size: parseInt(filter.size) || 10,
    age: filter.age ? encodeURIComponent(filter.age) : "",
    sort: filter.sort || "nom,asc",
    perimetres: "",
  };
};

const TRIES = [
  {
    label: "Nom  de famille croissant",
    code: "nom,asc",
  },
  {
    label: "Nom de famille décroissant",
    code: "nom,desc",
  },
  {
    label: "Prénom croissant",
    code: "prenom,asc",
  },
  {
    label: "Prénom décroissant",
    code: "prenom,desc",
  },
];

const RechercherPersonne = () => {
  const search = useSearch();
  const [showFilter, toggleFilter] = useToggle();

  const auth = useAuth();

  const searchPersonne = ({ queryKey }: any) => {
    const isAdmin = auth.userDroit?.isAdmin;
    const personne = auth.user?.personne;
    const filterParams = buildRequestParams(queryKey[1]);
    if (!isAdmin && personne?.organisation?.id && !filterParams.organisationId) {
      filterParams.organisationId = personne?.organisation?.id;
      filterParams.perimetres = buildPerimetres(personne?.organisation?.nature.code).join(";");
    }
    return personneApi.findAll<PersonneResource>(filterParams);
  };

  const query = useQuery({
    queryKey: [QUERY_KEY.personnes, search.queryParams],
    keepPreviousData: true,
    queryFn: searchPersonne,
  });

  const applyFilter = (data: any) => {
    search.onChangeFilter(data);
    toggleFilter();
  };

  const personnes = query.data?.data;
  const meta = query.data?.meta;
  const searchParams = parseParams(search.searchParams);

  return (
    <>
      <Header title="Personnes" right={<RechercherPersonneActions params={buildRequestParams(search.queryParams)} />} />

      <ListGroup className="mt-4">
        <SearchToolbar
          tries={TRIES}
          isFetching={query.isFetching && !query.isLoading}
          toggleFilter={toggleFilter}
          searchParams={searchParams}
          nombreResultat={meta?.total}
        />

        {showFilter && (
          <FilterPersonne applyFiler={applyFilter} defaultValues={searchParams} close={toggleFilter} show />
        )}

        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
          </ListGroup.Item>
        ) : (
          <ListPersonne personnes={personnes} />
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

export default RechercherPersonne;
