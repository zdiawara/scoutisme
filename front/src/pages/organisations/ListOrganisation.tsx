import { FC, useMemo } from "react";
import { Badge, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Columns, ListResult, PageFilter, PageHeader } from "pages/common";

type Organisation = {
  id: string;
  nom: string;
  code: string;
  typeOrganisation: string;
  etat: string;
};

const ListOrganisation: FC = () => {
  const data: Organisation[] = useMemo(() => {
    return new Array(10).fill(1).map(() => ({
      id: "10",
      code: "102",
      nom: "Lafia",
      typeOrganisation: "Unité",
      etat: "actif",
      chef: "Zakaridia DIAWARA",
      chefAdjoint: "Ouattara Moussa",
    }));
  }, []);

  const columns: Columns<Organisation>[] = [
    {
      name: "nom",
      label: "Nom",
      Cell: (organisation: Organisation) => {
        return <Link to="/organisations/12">{organisation.nom}</Link>;
      },
    },
    {
      name: "code",
      label: "Code",
    },
    {
      name: "typeOrganisation",
      label: "Type organisation",
    },
    {
      name: "chef",
      label: "Chef",
    },
    {
      name: "chefAdjoint",
      label: "Chef Adjoint",
    },
    {
      name: "etat",
      label: "Etat",
      Cell: () => <Badge bg="success">Actif</Badge>,
    },
  ];

  return (
    <>
      <PageHeader.List
        title="Organisations"
        subtitle="Consulter et gérer les organisations"
        icon="uil-building"
        right={
          <Link to="/scouts/create" className="btn btn-primary">
            <i className="uil-plus"></i> Ajouter une organisation
          </Link>
        }
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search />
        </Col>
      </PageFilter.Container>

      <ListResult.Container>
        <ListResult.Table<Organisation> columns={columns} data={data} />
        <ListResult.Paginate />
      </ListResult.Container>
    </>
  );
};

export default ListOrganisation;
