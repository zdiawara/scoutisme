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

const ListPersonne: FC = () => {
  const { filter, setFilter, setFilterByKey } = useContext(FilterContext);
  const { search, ...restFilter } = filter as PersonneFilter;
  const [show, setShow] = useState<boolean>(false);

  const { data: personnes, isLoading } = useQuery({
    queryKey: ["personnes", filter],
    keepPreviousData: true,
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      return personneApi.findAll<PersonneResource>({
        type: selectHelper.getValue(params.type),
        etat: selectHelper.getValue(params.etat),
        niveauFormationId: selectHelper.getValue(params.niveauFormation),
        villeId: selectHelper.getValue(params.ville),
        fonctionId: selectHelper.getValue(params.fonction),
        organisationId: selectHelper.getValue(params.organisation),
      });
    },
  });

  return (
    <>
      <PageHeader.List
        title="Personnes"
        subtitle="Consulter et gérer les personnes"
        icon={ICONS.personne}
        right={
          <>
            <Link to="/personnes/create" className="btn btn-primary">
              Ajouter un adulte
            </Link>
          </>
        }
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
    </>
  );
};

export default ListPersonne;
