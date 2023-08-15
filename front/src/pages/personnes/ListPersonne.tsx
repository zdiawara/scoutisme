import { FC, useContext } from "react";
import { Badge, Button, ButtonGroup, Col, Stack } from "react-bootstrap";
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

const ListPersonne: FC = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const { etat, search } = filter as PersonneFilter;
  console.log(filter);

  const { data: personnes, isLoading } = useQuery({
    queryKey: ["personnes", filter],
    keepPreviousData: true,
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      params.etat = params.etat === "tous" ? null : params.etat;
      return personneApi.findAll<PersonneResource>(params);
    },
  });

  const columns: Columns<PersonneResource>[] = [
    {
      name: "nom",
      label: "Nom",
      Cell: (personne: PersonneResource, i) => {
        return (
          <Link
            to={LINKS.personnes.view(personne.id)}
            className="text-black table-user d-flex"
          >
            <img
              src={`https://randomuser.me/api/portraits/men/${i + 1}.jpg`}
              alt=""
              className="me-2 rounded-circle"
            />
            <Stack className="fw-semibold">
              <span>
                {personne.prenom} {personne.nom}
              </span>
              <span className="text-muted fw-semibold">{personne.code}</span>
            </Stack>
          </Link>
        );
      },
    },

    {
      name: "type",
      label: "Type",
      Cell: ({ type }) => (
        <Badge
          className={`${type === "scout" ? "bg-outline-info" : "bg-secondary"}`}
        >
          {type}
        </Badge>
      ),
    },
    /*{
      name: "fonction",
      label: "Fonction",
      Cell: ({ fonction }) => (
        <Stack>
          <span>Conseiller de groupe</span>
          <span className="text-muted">Badenya</span>
        </Stack>
      ),
    },*/
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
      Cell: ({ etat }) => (
        <Badge bg={etat === 1 ? "success" : "danger"}>
          {etat === 1 ? "Actif" : "Inactif"}
        </Badge>
      ),
    },
    {
      name: "actions",
      label: "Actions",
      Cell: ({ id }) => {
        return (
          <Link to="#" className="action-icon">
            <i className="mdi mdi-delete fs-3 text-danger  "></i>
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader.List
        title="Personnes"
        subtitle="Consulter et gérer les personnes"
        icon={ICONS.personne}
        right={
          <Link to="/personnes/create" className="btn btn-primary">
            <i className="uil-plus"></i> Ajouter une personne
          </Link>
        }
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search
            onChange={(v) => {
              setFilter((prev: any) => ({ ...prev, search: v }));
            }}
            initialValue={search}
          />
        </Col>
        <Col>
          <div className="text-sm-end">
            <ButtonGroup>
              <Button
                variant={etat === "tous" ? "dark" : "light"}
                onClick={() => setFilter((prev) => ({ ...prev, etat: "tous" }))}
              >
                Tous
              </Button>
              <Button
                variant={etat === "1" ? "dark" : "light"}
                onClick={() => setFilter((prev) => ({ ...prev, etat: "1" }))}
              >
                Actif
              </Button>
              <Button
                variant={etat === "0" ? "dark" : "light"}
                onClick={() => setFilter((prev) => ({ ...prev, etat: "0" }))}
              >
                Inactif
              </Button>
            </ButtonGroup>

            <Button variant="outline-dark" className="ms-2">
              <i className="uil-filter"></i> Filtre avancé
            </Button>
          </div>
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<PersonneResource>
          columns={columns}
          data={personnes?.data || []}
        />
        {personnes && (
          <ListResult.Paginate
            pageCount={personnes.meta.last_page}
            pageActive={personnes.meta.current_page - 1}
            onPageChange={(page) => {
              console.log(page);
              setFilter((old) => ({ ...old, page }));
            }}
          />
        )}
      </ListResult.Container>
    </>
  );
};

export default ListPersonne;
