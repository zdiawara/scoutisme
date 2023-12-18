import { FC, useContext, useState } from "react";
import { Button, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Columns,
  ICONS,
  ListResult,
  PageFilter,
  PageHeader,
} from "pages/common";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { PersonneFilter, RequestParam } from "types/request.type";
import { FilterContext } from "context/FIlterContext";
import { TooltipHelper } from "components";
import { FilterPersonne } from "./FilterPersonne";
import { selectHelper } from "utils/functions";
import { ListPersonneActions } from "./common/ListPersonneActions";
import { ExportPersonneModal } from "./modal";
import { NATURE, QUERY_KEY } from "utils/constants";
import { PersonneActions } from "./common/PersonneActions";

const renderOrganisation = ({ organisation }: PersonneResource) => {
  if (organisation) {
    const natures = [NATURE.unite, NATURE.groupe];
    return (
      <>
        <span className="text-muted">{organisation.nature.nom}</span>&nbsp;
        <Link to={LINKS.organisations.view(organisation.id)}>
          {organisation.nom}
        </Link>
        {natures.includes(organisation.nature.code) && (
          <TooltipHelper
            description={
              <>
                {organisation?.parents?.reverse()?.map((e) => (
                  <div key={e.id}>{e.nom}</div>
                ))}
              </>
            }
          />
        )}
      </>
    );
  }
  return <span>-</span>;
};

const renderPersonne = ({
  id,
  nom,
  prenom,
  genre,
  photo,
}: PersonneResource) => {
  return (
    <Link to={LINKS.personnes.view(id)} className="table-user d-flex">
      <div className="avatar-sm me-2">
        {photo ? (
          <img
            src={photo}
            alt=""
            className="rounded-circle"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              objectFit: "cover",
              color: "transparent",
              textIndent: "10000px",
            }}
          />
        ) : (
          <span className="avatar-title bg-secondary-lighten text-secondary fs-4 rounded-circle">
            {prenom[0]}
            {nom[0]}
          </span>
        )}
      </div>
      <Stack>
        <span className="text-primary fw-semibold">
          {prenom} {nom}
        </span>
        <span className="text-muted text-capitalize">{genre?.nom}</span>
      </Stack>
    </Link>
  );
};

const columns: Columns<PersonneResource>[] = [
  {
    name: "nom",
    label: "Nom",
    Cell: renderPersonne,
  },

  {
    name: "fonction",
    label: "Fonction",
    Cell: ({ fonction }) => {
      if (fonction) {
        return <span>{fonction.nom}</span>;
      }
      return <span>-</span>;
    },
  },

  {
    name: "organisation",
    label: "Organisation",
    Cell: renderOrganisation,
  },

  {
    name: "email",
    label: "Email",
    Cell: ({ email }) => <span>{email}</span>,
  },
  {
    name: "actions",
    label: "Actions",
    headClassName: "text-end",
    Cell: (personne) => {
      return (
        <div className="text-end">
          <PersonneActions personne={personne} />
        </div>
      );
    },
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

const ListPersonne: FC = () => {
  const filterContext = useContext(FilterContext);
  const filter = filterContext.filter as PersonneFilter;
  const [show, setShow] = useState<boolean>(false);
  const [exportModal, setExportModal] = useState<boolean>(false);

  const { data: result, isLoading } = useQuery({
    queryKey: [QUERY_KEY.personnes, filter],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return personneApi.findAll<PersonneResource>(
        buildRequestParams(queryKey[1] as RequestParam)
      );
    },
  });

  return (
    <>
      <PageHeader.List
        title="Personnes"
        subtitle="Consulter et gérer les personnes"
        icon={ICONS.personne}
        right={<ListPersonneActions />}
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
        <FilterPersonne
          applyFiler={(data) => {
            filterContext.setFilter((prev) => ({ ...prev, ...data, page: 1 }));
            setShow(false);
          }}
          defaultValues={filterContext.filter}
          show={show}
          close={() => setShow(false)}
        />
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<PersonneResource>
          columns={columns}
          data={result?.data || []}
          headerClassName="bg-light"
        />
        {result?.data && (
          <ListResult.Paginate
            pageCount={result.meta.total_page}
            pageActive={result.meta.page - 1}
            total={result.meta.total}
            onPageChange={(page) => {
              filterContext.setFilter((old) => ({ ...old, page: page + 1 }));
            }}
          />
        )}
      </ListResult.Container>
      {exportModal && (
        <ExportPersonneModal
          filter={buildRequestParams(filter)}
          closeModal={() => setExportModal(false)}
        />
      )}
    </>
  );
};

export default ListPersonne;
