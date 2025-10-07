import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { FC, useMemo } from "react";
import { Card, Table, Row, Col, Button, ProgressBar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StatOrgaNature } from "types/stats.type";
import { LINKS } from "utils";
import { NATURE } from "utils/constants";

type ItemProps = {
  title: string;
  rows: Array<{
    region: string;
    nombre: number;
    id: string;
  }>;
  nature: string;
};
const Item: FC<ItemProps> = ({ title, rows, nature }) => {
  const total = useMemo(() => {
    return rows.map((e) => e.nombre).reduce((c, p) => p + c, 0);
  }, [rows]);
  return (
    <>
      <Card body>
        <Button variant="light" size="sm" className="float-end">
          Exporter
        </Button>
        <h4 className="fs-5 fw-regular mt-1 mb-3">{title}</h4>

        <Table responsive className="table table-sm table-striped table-centered mb-0 font-14">
          <thead className="table-light">
            <tr>
              <th>Région</th>
              <th className="text-center">Nombre {nature === "groupe" ? "de groupe" : "d'unité"}</th>
              <th style={{ width: "100px" }}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <Link to={LINKS.organisations.view(row.id)} className="text-black">
                    {row.region}
                  </Link>
                </td>
                <td className="text-primary text-center fw-bold">{row.nombre}</td>
                <td>
                  <ProgressBar
                    variant="info"
                    now={total > 0 ? (row.nombre / total) * 100 : 0}
                    style={{ height: "6px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

const OrganisationDashBord = () => {
  const byRegionQuery = useQuery({
    queryKey: ["dash_organisation_regions"],
    networkMode: "offlineFirst",
    queryFn: async () => {
      const { data } = await statApi.organisations.byRegion();
      return data;
    },
  });

  const coutAllQuery = useQuery({
    queryKey: ["dash_organisation"],
    networkMode: "offlineFirst",
    queryFn: async () => {
      const { data } = await statApi.organisations.countAll();
      return data;
    },
  });

  if (!byRegionQuery.data || !coutAllQuery.data) {
    return null;
  }

  const convert = (a: StatOrgaNature) => {
    if (a.code === "unite") {
      return 3;
    }
    if (a.code === "groupe") {
      return 2;
    }
    return 1;
  };

  // const buildColor = (a: StatOrgaNature) => {
  //   if (a.code === "unite") {
  //     return "danger";
  //   }
  //   if (a.code === "groupe") {
  //     return "info";
  //   }
  //   return "warning";
  // };

  return (
    <Container>
      <Row className="g-3">
        {coutAllQuery.data
          .filter((e) => [NATURE.groupe, NATURE.region, NATURE.unite].includes(e.code))
          .sort((a, b) => {
            return convert(b) - convert(a);
          })
          .map((item) => (
            <Col xs={6} sm={4} key={item.code}>
              <Card className="mb-0">
                <Card.Body>
                  <h5 className="text-uppercase">{item.code}</h5>
                  <div className="mt-2 fs-2 mb-0 text-primary">{item.nombre}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Row className="g-3 mt-2">
        <Col xs={12} sm={6}>
          <Item
            title="Nombre d'unite par region"
            rows={byRegionQuery.data.map((item: any) => ({
              id: item.id,
              region: item.nom,
              nombre: parseInt(item.nombre_unite),
            }))}
            nature={NATURE.unite}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Item
            title="Nombre de groupe par region"
            rows={byRegionQuery.data.map((item: any) => ({
              id: item.id,
              region: item.nom,
              nombre: parseInt(item.nombre_groupe),
            }))}
            nature={NATURE.groupe}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default OrganisationDashBord;
