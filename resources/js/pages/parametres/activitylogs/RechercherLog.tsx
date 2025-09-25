import { useQuery } from "@tanstack/react-query";
import { logApi } from "api";
import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { QUERY_KEY } from "utils/constants";
import { Header } from "layout/Header";
import { LoaderSpinner } from "components/loader";
import { useSearch } from "hooks/useSearch";
import { RequestParam } from "types/request.type";
import { selectHelper } from "utils/functions";
import { SearchToolbar } from "pages/common/toolbar";
import { ListResult } from "pages/common";
import { LogActivityResource } from "types/log-activity.type";
import { ListLog } from "./ListLog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rechercherLog = ({ queryKey }: any) =>
  logApi.findAll<LogActivityResource>(buildRequestParams(queryKey[1] as RequestParam));

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

const RechercherLog: FC = () => {
  const search = useSearch();
  const searchParams = parseParams(search.searchParams);

  const query = useQuery({
    queryKey: [QUERY_KEY.logs, search.queryParams],
    keepPreviousData: true,
    queryFn: rechercherLog,
  });

  const meta = query.data?.meta;

  return (
    <>
      <Header title="Logs d'activités" />

      <ListGroup className="mt-4">
        <SearchToolbar isFetching={query.isFetching && !query.isLoading} nombreResultat={meta?.total} />
        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
          </ListGroup.Item>
        ) : (
          <ListLog logs={query.data?.data} />
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

export default RechercherLog;
