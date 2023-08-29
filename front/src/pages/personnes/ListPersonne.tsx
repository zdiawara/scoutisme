import { FC, useContext } from "react";
import { Button, ButtonGroup, Col, Stack } from "react-bootstrap";
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

const ListPersonne: FC = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const { etat, search } = filter as PersonneFilter;

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
      name: "code",
      label: "Code",
    },
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
              <span className="text-muted text-capitalize">
                {personne.type}
              </span>
            </Stack>
          </Link>
        );
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
        className="my-4"
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
                variant={etat === "tous" ? "secondary" : "light"}
                onClick={() => setFilter((prev) => ({ ...prev, etat: "tous" }))}
              >
                Tous
              </Button>
              <Button
                variant={etat === "1" ? "secondary" : "light"}
                onClick={() => setFilter((prev) => ({ ...prev, etat: "1" }))}
              >
                Actif
              </Button>
              <Button
                variant={etat === "0" ? "secondary" : "light"}
                onClick={() => setFilter((prev) => ({ ...prev, etat: "0" }))}
              >
                Inactif
              </Button>
            </ButtonGroup>

            <Button variant="secondary" className="ms-2">
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
