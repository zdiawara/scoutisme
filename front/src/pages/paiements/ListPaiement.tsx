import { useQuery } from "@tanstack/react-query";
import { paiementApi } from "api";
import { FilterContext } from "context";
import {
  Columns,
  ICONS,
  ListResult,
  PageFilter,
  PageHeader,
} from "pages/common";
import { PaiementActions } from "pages/personnes/common/PaiementActions";
import { FC, useContext } from "react";
import { Badge, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaiementResource } from "types/personne.type";
import { PaiementFilter, RequestParam } from "types/request.type";
import { LINKS } from "utils";
import { DATE_PATTERN, QUERY_KEY } from "utils/constants";
import { dateFormater, selectHelper } from "utils/functions";

const columns: Columns<PaiementResource>[] = [
  {
    name: "numero",
    label: "Numéro paiement",
  },
  {
    name: "montant",
    label: "Montant payé",
  },
  {
    name: "code",
    label: "Code personne",
    Cell: ({ cotisation }) => <span>{cotisation.personne?.code}</span>,
  },
  {
    name: "personne",
    label: "Personne",
    Cell: ({ cotisation }) => (
      <Link
        className="d-block"
        to={LINKS.personnes.view(cotisation.personne?.id || "#")}
      >
        {cotisation.personne?.nom} {cotisation.personne?.prenom}
      </Link>
    ),
  },
  {
    name: "created_at",
    label: "Date paiement",
    Cell: ({ created_at }) => {
      return (
        <span>
          {dateFormater.format(
            new Date(created_at),
            DATE_PATTERN.dd_mm_yyyy_hh_mm
          )}
        </span>
      );
    },
  },
  {
    name: "etat",
    label: "Etat",
    Cell: ({ etat }) => {
      return (
        <Badge
          bg={
            etat === "valide"
              ? "success"
              : etat === "rejet"
              ? "danger"
              : "warning"
          }
        >
          {etat}
        </Badge>
      );
    },
  },
  {
    name: "actions",
    label: "Actions",
    headClassName: "text-end",
    Cell: (paiement) => {
      return (
        <PaiementActions
          personne={paiement.cotisation.personne!}
          paiement={paiement}
        />
      );
    },
  },
];

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    etat: selectHelper.getValue(filter.etat),
    search: filter.search,
    page: filter.page,
    size: filter.size,
  };
};

const ListPaiement: FC = () => {
  const filterContext = useContext(FilterContext);
  const filter = filterContext.filter as PaiementFilter;

  const { data: results, isLoading } = useQuery({
    queryKey: [QUERY_KEY.paiements, filter],
    networkMode: "offlineFirst",
    cacheTime: 0,
    queryFn: ({ queryKey }) => {
      return paiementApi.findAll<PaiementResource>(
        buildRequestParams(queryKey[1] as RequestParam)
      );
    },
  });

  return (
    <>
      <PageHeader.List
        title="Paiements"
        subtitle="Consulter et gérer les paiements"
        icon={ICONS.paiement}
        className="my-4"
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search
            onChange={(search) => {
              filterContext.setFilter((prev) => ({ ...prev, search, page: 1 }));
            }}
            initialValue=""
          />
        </Col>
        <Col>
          <div className="text-sm-end">
            <Button variant="secondary" className="ms-2">
              <i className="uil-filter"></i> Filtre avancé
            </Button>
          </div>
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<PaiementResource>
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

export default ListPaiement;
