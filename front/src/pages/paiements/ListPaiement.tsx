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
import { FC, useContext, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { PaiementFilter, RequestParam } from "types/request.type";
import { QUERY_KEY } from "utils/constants";
import { selectHelper } from "utils/functions";
import { EtatPaiement } from "./common";
import { MontantFormatText } from "components";
import { FilterPaiement } from "./form";

const columns: Columns<PaiementResource>[] = [
  {
    name: "numero",
    label: "Numéro paiement",
    Cell: ({ numero }) => (
      <span className="text-primary fw-bold">{numero}</span>
    ),
  },
  {
    name: "montant",
    label: "Montant",
    Cell: ({ montant }) => <MontantFormatText withDevise value={montant} />,
  },
  {
    name: "code",
    label: "Code personne",
    Cell: ({ cotisation }) => <span>{cotisation.personne?.code}</span>,
  },
  {
    name: "personne",
    label: "Payeur",
    Cell: ({ cotisation }) => (
      <span className="text-primary">
        {cotisation.personne?.nom} {cotisation.personne?.prenom}
      </span>
    ),
  },
  {
    name: "created_at",
    label: "Date soumission",
  },
  {
    name: "etat",
    label: "Etat",
    Cell: ({ etat }) => <EtatPaiement etat={etat} />,
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
    search: filter.search,
    page: filter.page,
    size: filter.size,
    etat: selectHelper.getValue(filter.etat),
    fonctionId: selectHelper.getValue(filter.fonction),
    organisationId: selectHelper.getValue(filter.organisation),
  };
};

const ListPaiement: FC = () => {
  const filterContext = useContext(FilterContext);
  const filter = filterContext.filter as PaiementFilter;
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const { data: results, isLoading } = useQuery({
    queryKey: [QUERY_KEY.paiements, filter],
    networkMode: "offlineFirst",
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
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => {
                setShowFilter(true);
              }}
            >
              <i className="uil-filter"></i> Filtre avancé
            </Button>
          </div>
        </Col>
        <FilterPaiement
          applyFiler={(data) => {
            filterContext.setFilter((prev) => ({ ...prev, ...data, page: 1 }));
            setShowFilter(false);
          }}
          defaultValues={filterContext.filter}
          show={showFilter}
          close={() => setShowFilter(false)}
        />
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
