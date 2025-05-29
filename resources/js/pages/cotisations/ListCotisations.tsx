import { FC, useContext, useState } from "react";
import { Button, Col } from "react-bootstrap";
import {
  Columns,
  ICONS,
  ListResult,
  PageFilter,
  PageHeader,
} from "pages/common";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";
import { useQuery } from "@tanstack/react-query";
import { PersonneFilter, RequestParam } from "types/request.type";
import { FilterContext } from "context/FIlterContext";

import { selectHelper } from "utils/functions";

import { QUERY_KEY } from "utils/constants";

const columns: Columns<any>[] = [
  {
    name: "personne",
    label: "Personne",
  },
  {
    name: "annee",
    label: "Année",
  },
  {
    name: "montant_total",
    label: "Montant à payer",
  },
  {
    name: "montant_paye",
    label: "Montant payé",
  },
  {
    name: "montant_restant",
    label: "Montant restant",
  },
  {
    name: "actions",
    label: "Actions",
  },
];

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    type: selectHelper.getValue(filter.type),
    etat: selectHelper.getValue(filter.etat),
    niveauFormationId: selectHelper.getValue(filter.niveauFormation),
    villeId: selectHelper.getValue(filter.ville),
    genreId: selectHelper.getValue(filter.genre),
    fonctionId: selectHelper.getValue(filter.fonction),
    organisationId: selectHelper.getValue(filter.organisation),
    inclureSousOrganisation: filter.inclureSousOrganisation,
    search: filter.search,
    page: filter.page,
    size: filter.size,
  };
};

const ListCotisation: FC = () => {
  const filterContext = useContext(FilterContext);
  const filter = filterContext.filter as PersonneFilter;
  const [show, setShow] = useState<boolean>(false);
  const [exportModal, setExportModal] = useState<boolean>(false);
  const { data: result, isLoading } = useQuery({
    queryKey: [QUERY_KEY.personnes, filter],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return Promise.resolve({
        data: [
          {
            annee: "2023",
            personne: "Zakaridia DIAWARA",
            montant_total: "2 000 fcfa",
            montant_paye: "1 500 fcfa",
            montant_restant: "500 fcfa",
          },
        ],
      });
    },
  });

  return (
    <>
      <PageHeader.List
        title="Cotisations"
        subtitle="Consulter et gérer les cotisations"
        icon={ICONS.cotisation}
        //right={<ListPersonneActions />}
        className="my-4"
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search
            onChange={(search) => {
              filterContext.setFilter((prev) => ({ ...prev, search, page: 1 }));
            }}
            initialValue={filter.search}
          />
        </Col>
        <Col>
          <div className="text-sm-end">
            <Button
              variant="outline-primary"
              onClick={() => {
                setExportModal(true);
              }}
            >
              Exporter
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => {
                setShow(true);
              }}
            >
              <i className="uil-filter"></i> Filtre avancé
            </Button>
          </div>
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<any>
          columns={columns}
          data={result?.data || []}
          headerClassName="bg-light"
        />
        {/* {result?.data && (
          <ListResult.Paginate
            pageCount={result.meta.total_page}
            pageActive={result.meta.page - 1}
            total={result.meta.total}
            onPageChange={(page) => {
              filterContext.setFilter((old) => ({ ...old, page: page + 1 }));
            }}
          />
        )} */}
      </ListResult.Container>
    </>
  );
};

export default ListCotisation;
