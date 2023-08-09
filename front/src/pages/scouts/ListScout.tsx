import { FC, useMemo } from "react";
import { Badge, Button, ButtonGroup, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Columns, ListResult, PageFilter, PageHeader } from "pages/common";

type Personne = {
  id: string;
  nom: string;
  code: string;
  prenom: string;
  date_naissance: string;
  date_adhesion: string;
  email: string;
  organisation: string;
  etat: string;
};

const ListScout: FC = () => {
  const personnes: Personne[] = useMemo(() => {
    return new Array(10).fill(1).map(() => ({
      id: "10",
      code: "102",
      nom: "DIAWARA",
      prenom: "Zakaridia",
      date_naissance: "25/04/1990",
      date_adhesion: "25/04/1990",
      email: "zakaridia.diawara@gmail.com",
      organisation: "Unité lafia",
      etat: "actif",
    }));
  }, []);

  const columns: Columns<Personne>[] = [
    {
      name: "nom",
      label: "Nom",
      Cell: (personne: Personne, i) => {
        return (
          <Link to="/scouts/12" className="text-black table-user d-flex">
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
      name: "organisation",
      label: "Organisation",
      Cell: ({ organisation }) => (
        <Stack>
          <span>{organisation}</span>
          <span className="text-muted">Membre</span>
        </Stack>
      ),
    },
    { name: "date_adhesion", label: "Date adhésion" },
    {
      name: "date_naissance",
      label: "Info naissance",
      Cell: ({ date_naissance }) => (
        <Stack>
          <span>{date_naissance}</span>
          <span className="text-muted">Bobo Dioulasso</span>
        </Stack>
      ),
    },
    { name: "email", label: "Email" },
    {
      name: "etat",
      label: "Etat",
      Cell: () => <Badge bg="success">Actif</Badge>,
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
        title="Scouts"
        subtitle="Consulter et gérer les scouts"
        icon="uil-users-alt"
        right={
          <Link to="/scouts/create" className="btn btn-primary">
            <i className="uil-plus"></i> Ajouter un scout
          </Link>
        }
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search />
        </Col>
        <Col>
          <div className="text-sm-end">
            <ButtonGroup>
              <Button variant="dark">Tous</Button>
              <Button variant="light">Actif</Button>
              <Button variant="light">Inactif</Button>
            </ButtonGroup>

            <Button variant="dark" className="ms-2">
              <i className="uil-filter"></i> Filtre avancé
            </Button>
          </div>
        </Col>
      </PageFilter.Container>

      <ListResult.Container>
        <ListResult.Table<Personne> columns={columns} data={personnes} />
        <ListResult.Paginate />
      </ListResult.Container>
    </>
  );
};

export default ListScout;
