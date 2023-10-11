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
import { View } from "components";
import { FilterPersonne } from "./FilterPersonne";
import { selectHelper } from "utils/functions";
import { ListPersonneActions } from "./common/ListPersonneActions";
import { ExportPersonneModal } from "./modal";

const columns: Columns<PersonneResource>[] = [
  {
    name: "nom",
    label: "Nom",
    Cell: (personne: PersonneResource, i) => {
      return (
        <Link
          to={LINKS.personnes.view(personne.id)}
          className="table-user d-flex"
        >
          <div className="avatar-sm me-2">
            {personne.photo ? (
              <img
                src={personne.photo}
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
                {personne.prenom[0]}
                {personne.nom[0]}
              </span>
            )}
          </div>
          <Stack>
            <span className="text-primary fw-semibold">
              {personne.prenom} {personne.nom}
            </span>
            <span className="text-muted text-capitalize">{personne.type}</span>
          </Stack>
        </Link>
      );
    },
  },
  {
    name: "organisation",
    label: "Organisation",
    Cell: ({ attributions }) => {
      if (attributions?.length) {
        return <span>{attributions[0].organisation.nom}</span>;
      }
      return null;
    },
  },
  {
    name: "fonction",
    label: "Fonction",
    Cell: ({ attributions }) => {
      if (attributions?.length) {
        return <span>{attributions[0].fonction.nom}</span>;
      }
      return null;
    },
  },
  {
    name: "lieu_naissance",
    label: "Lieu naissance",
  },
  {
    name: "date_naissance",
    label: "Date naissance",
  },
  { name: "email", label: "Email" },
  {
    name: "etat",
    label: "Etat",
    Cell: ({ etat }) => <View.Etat value={etat} />,
  },
  {
    name: "actions",
    label: "Actions",
    headClassName: "text-end",
    Cell: () => {
      return (
        <div className="text-end">
          <Button
            className="action-icon"
            variant="link"
            //onClick={() => setAction({ code: "edit", fonction })}
          >
            <i className="uil-edit-alt fs-4 text-primary"></i>
          </Button>
          {/* <Button variant="link" className="action-icon">
            <i className="mdi mdi-delete fs-4 text-danger"></i>
          </Button> */}
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
    fonctionId: selectHelper.getValue(filter.fonction),
    organisationId: selectHelper.getValue(filter.organisation),
    search: filter.search,
  };
};

const ListPersonne: FC = () => {
  const { filter, setFilter, setFilterByKey } = useContext(FilterContext);
  const { search, ...restFilter } = filter as PersonneFilter;
  const [show, setShow] = useState<boolean>(false);
  const [exportModal, setExportModal] = useState<boolean>(false);
  const { data: personnes, isLoading } = useQuery({
    queryKey: ["personnes", filter],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      return personneApi.findAll<PersonneResource>(buildRequestParams(params));
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
            onChange={(v) => {
              setFilterByKey("search", v);
            }}
            initialValue={search}
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
            setFilter((prev) => ({ ...prev, ...data }));
            setShow(false);
          }}
          defaultValues={restFilter}
          show={show}
          close={() => setShow(false)}
        />
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<PersonneResource>
          columns={columns}
          data={personnes?.data || []}
          headerClassName="bg-light"
        />
        {/* {personnes && (
          <ListResult.Paginate
            pageCount={personnes.meta.last_page}
            pageActive={personnes.meta.current_page - 1}
            pageCount={2}
            pageActive={1}
            onPageChange={(page) => {
              console.log(page);
              setFilter((old) => ({ ...old, page }));
            }}
          />
        )} */}
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
