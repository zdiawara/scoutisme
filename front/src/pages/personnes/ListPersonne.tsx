import { FC, useContext, useMemo, useState } from "react";
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
import { NATURE, QUERY_KEY } from "utils/constants";
import { PersonneActions } from "./common/PersonneActions";
import { useAuth } from "hooks";
import { PersonneUtils } from "utils/PersonneUtils";

const renderOrganisation = ({ organisation }: PersonneResource) => {
  if (organisation) {
    const natures = [NATURE.unite, NATURE.groupe];
    return (
      <>
        <span className="text-muted">{organisation?.nature?.nom}</span>&nbsp;
        <Link to={LINKS.organisations.view(organisation?.id)}>
          {organisation.nom}
        </Link>
        {natures.includes(organisation?.nature?.code) && (
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

const renderPersonne = ({ id, nom, prenom, code, photo }: PersonneResource) => {
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
        <span className="text-muted text-capitalize">{code}</span>
      </Stack>
    </Link>
  );
};

const buildRequestParams = (filter: Record<string, any>) => {
  return {
    type: selectHelper.getValue(filter.type),
    etat: selectHelper.getValue(filter.etat),
    niveauFormationId: selectHelper.getValue(filter.niveauFormation),
    villeId: selectHelper.getValue(filter.ville),
    genreId: selectHelper.getValue(filter.genre),
    fonctionId: selectHelper.getValue(filter.fonction),
    organisationId: selectHelper.getValue(filter.organisation),
    perimetres: filter.inclureSousOrganisation
      ? filter.perimetres.join(";")
      : undefined,
    search: filter.search,
    page: filter.page,
    size: filter.size,
  };
};

const ListPersonne: FC = () => {
  const filterContext = useContext(FilterContext);
  const filter = filterContext.filter as PersonneFilter;
  const [show, setShow] = useState<boolean>(false);

  const { userDroit } = useAuth();

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

  const columns = useMemo(() => {
    const cols: Columns<PersonneResource>[] = [
      {
        name: "nom",
        label: "Nom",
        Cell: renderPersonne,
      },
      {
        name: "genre",
        label: "Genre",
        Cell: ({ genre }) => <span>{genre?.nom}</span>,
      },
      // {
      //   name: "type",
      //   label: "Type",
      //   Cell: ({ type }) => (
      //     <Badge bg="secondary">{type.toLocaleUpperCase()}</Badge>
      //   ),
      // },
      {
        name: "fonction",
        label: "Fonction",
        Cell: ({ fonction, organisation }) => {
          if (fonction) {
            return (
              <>
                <span className="text-primary">{fonction?.nom}</span>
                {fonction.code === "scout" && organisation?.type?.membre && (
                  <>
                    &nbsp;/&nbsp;
                    <span>{organisation?.type?.membre}</span>
                  </>
                )}
              </>
            );
          }
          return <span>-</span>;
        },
      },

      {
        name: "organisation",
        label: "Organisation",
        Cell: renderOrganisation,
      },
    ];

    if (userDroit?.isAdmin) {
      cols.push({
        name: "actions",
        label: "Actions",
        headClassName: "text-end",
        Cell: (personne) => {
          return (
            <div className="d-flex" style={{ justifyContent: "end" }}>
              <Link
                to={LINKS.personnes.view(personne.id)}
                className="btn btn-sm btn-light"
              >
                voir
              </Link>
              {PersonneUtils.isAdulte(personne) && (
                <PersonneActions personne={personne} />
              )}
            </div>
          );
        },
      });
    }

    return cols;
  }, [userDroit]);

  return (
    <>
      <PageHeader.List
        title="Personnes"
        subtitle="Consulter et gérer les personnes"
        icon={ICONS.personne}
        right={<ListPersonneActions filter={buildRequestParams(filter)} />}
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
              variant="outline-secondary"
              className="ms-2"
              onClick={() => {
                setShow(true);
              }}
            >
              <i className="uil-filter"></i> Filtre avancé (
              {
                Object.entries(filter)
                  .filter((e) => !["page", "size", "perimetres"].includes(e[0]))
                  .filter((e) => Boolean(e[1])).length
              }
              )
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
          // headerClassName="bg-light"
          // hover
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
    </>
  );
};

export default ListPersonne;
