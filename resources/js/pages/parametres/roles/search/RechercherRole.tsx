import { useQuery } from "@tanstack/react-query";
import { roleApi } from "api";
import { FC, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { QUERY_KEY } from "utils/constants";
import { Header } from "layout/Header";
import { LoaderSpinner } from "components/loader";
import { useSearch } from "hooks/useSearch";
import { RequestParam } from "types/request.type";
import { selectHelper } from "utils/functions";
import { SearchToolbar } from "pages/common/toolbar";
import useToggle from "hooks/useToggle";
import { ListResult } from "pages/common";
import { RoleResource } from "types/auth.type";
import { ListRole } from "./list/ListRole";
import { EditRole } from "../edit/EditRole";
import * as Icon from "react-bootstrap-icons";

type Action = {
  code: "create" | "edit";
  selected?: RoleResource;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchRoles = ({ queryKey }: any) =>
  roleApi.findAll<RoleResource>(buildRequestParams(queryKey[1] as RequestParam));

const parseParams = (searchParams: URLSearchParams) => {
  const perimetre = searchParams.get("perimetre");

  return {
    perimetre: perimetre ? JSON.parse(perimetre) : null,

    search: searchParams.get("search"),
    page: searchParams.get("page") || "1",
    size: searchParams.get("size") || "10",
    sort: searchParams.get("sort") || "nom,asc",
  };
};

const buildRequestParams = (filter: RequestParam) => {
  return {
    nature: selectHelper.getValueFromJson(filter.perimetre),

    search: filter.search,
    page: parseInt(filter.page as string) || 1,
    size: parseInt(filter.size as string) || 10,
    sort: filter.sort || "nom,asc",
  };
};

const TRIES = [
  {
    label: "Nom croissant",
    code: "nom,asc",
  },
  {
    label: "Nom décroissante",
    code: "nom,desc",
  },
];

const RechercherRole: FC = () => {
  const search = useSearch();
  const searchParams = parseParams(search.searchParams);
  const [, toggleFilter] = useToggle();

  const query = useQuery({
    queryKey: [QUERY_KEY.roles, search.queryParams],
    keepPreviousData: true,
    queryFn: searchRoles,
  });

  const [action, setAction] = useState<Action | undefined>();

  const actions = (
    <Button variant="secondary" onClick={() => setAction({ code: "create" })}>
      <Icon.Plus className="d-inline-block d-sm-none" />
      <span className="d-none d-sm-inline-block">Ajouter un rôle</span>
    </Button>
  );

  const meta = query.data?.meta;

  return (
    <>
      <Header title="Rôles" right={actions} />

      <ListGroup className="mt-4">
        <SearchToolbar
          isFetching={query.isFetching && !query.isLoading}
          searchParams={searchParams}
          nombreResultat={meta?.total}
          toggleFilter={toggleFilter}
          tries={TRIES}
        />
        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
          </ListGroup.Item>
        ) : (
          <ListRole roles={query.data?.data} />
        )}
      </ListGroup>

      {/* {showFilter && (
        <FilterFonction
          applyFiler={(data) => {
            search.onChangeFilter(data);
            toggleFilter();
          }}
          defaultValues={searchParams}
          close={toggleFilter}
          show
        />
      )} */}

      {action && <EditRole closeModal={() => setAction(undefined)} role={action.selected} />}

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

export default RechercherRole;
