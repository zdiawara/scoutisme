import { FC, useContext } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Columns,
  ICONS,
  ListResult,
  PageFilter,
  PageHeader,
} from "pages/common";
import { MessageFilter, RequestParam } from "types/request.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { messageApi } from "api";
import { LINKS } from "utils";
import { MessageResource } from "types/message.type";
import { FilterContext } from "context";

const columns: Columns<MessageResource>[] = [
  {
    name: "objet",
    label: "Objet",
    Cell: (message) => {
      return (
        <Link
          className="text-primary fw-semibold"
          to={LINKS.messages.view(message.id)}
        >
          {message.objet}
        </Link>
      );
    },
  },
  {
    name: "auteur",
    label: "Auteur",
    Cell: ({ created_at }) => {
      return <span className="text-dark">Zakaridia DIAWARA</span>;
    },
  },
  {
    name: "nombre_destinataires",
    label: "Nombre de destinataires",
    Cell: ({ nombre_destinataires }) => {
      return (
        <span className="text-dark">
          {nombre_destinataires} destinataire(s)
        </span>
      );
    },
  },

  {
    name: "date",
    label: "Date envoie",
    Cell: ({ created_at }) => {
      return <>{created_at}</>;
    },
  },
];

const ListMessage: FC = () => {
  const filterContext = useContext(FilterContext);
  const filter = filterContext.filter as MessageFilter;
  const { data: results, isLoading } = useQuery({
    queryKey: [QUERY_KEY.messages, filter],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      return messageApi.findAll<MessageResource>(params);
    },
  });

  return (
    <>
      <PageHeader.List
        title="Mails"
        subtitle="Consulter et gérer vos mails"
        icon={ICONS.message}
        className="my-4"
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search
            onChange={(v) => {
              filterContext.setFilter((prev) => ({ ...prev, search: v }));
            }}
            initialValue={filter.search}
          />
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<MessageResource>
          columns={columns}
          data={results?.data || []}
          headerClassName="bg-light"
        />
        {results?.data && (
          <ListResult.Paginate
            pageCount={results.meta.total_page}
            pageActive={results.meta.page - 1}
            total={results.meta.total}
            onPageChange={(page) => {
              filterContext.setFilter((old) => ({ ...old, page: page + 1 }));
            }}
          />
        )}
      </ListResult.Container>
    </>
  );
};

export default ListMessage;
