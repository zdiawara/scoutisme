import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { FC, useMemo } from "react";
import { Card, Table, ProgressBar, Row, Col, Button } from "react-bootstrap";
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
    <Card>
      <Card.Body>
        <Button variant="light" size="sm" className="float-end">
          Exporter <i className="mdi mdi-download ms-1"></i>
        </Button>
        <h4 className="header-title mt-1 mb-3">{title}</h4>

        <Table
          responsive
          className="table table-sm table-centered mb-0 font-14"
        >
          <thead className="table-light">
            <tr>
              <th>Région</th>
              <th>Nombre {nature === "groupe" ? "de groupe" : "d'unité"}</th>
              <th style={{ width: "200px" }}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <Link
                    to={LINKS.organisations.view(row.id)}
                    className="text-primary text-decoration-underline"
                  >
                    {row.region}
                  </Link>
                </td>
                <td className="text-primary fw-bold">{row.nombre}</td>
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
      </Card.Body>
    </Card>
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

  const buildColor = (a: StatOrgaNature) => {
    if (a.code === "unite") {
      return "danger";
    }
    if (a.code === "groupe") {
      return "info";
    }
    return "warning";
  };

  return (
    <>
      <Row className="g-3 mt-2">
        {coutAllQuery.data
          .filter((e) =>
            [NATURE.groupe, NATURE.region, NATURE.unite].includes(e.code)
          )
          .sort((a, b) => {
            return convert(b) - convert(a);
          })
          .map((item) => (
            <Col xs={4} key={item.code}>
              <Card className="mb-0">
                <Card.Body>
                  <div className="float-end">
                    <i
                      className={`uil-building text-${buildColor(
                        item
                      )} bg-${buildColor(item)}-lighten widget-icon`}
                    ></i>
                  </div>
                  <h5 className="text-uppercase">{item.code}</h5>
                  <h3 className="mt-3 mb-0 text-primary">{item.nombre}</h3>
                </Card.Body>
              </Card>
            </Col>
          ))}
        <Col xs={6}>
          <Item
            title="Nombre d'Unite par region"
            rows={byRegionQuery.data.map((item: any) => ({
              id: item.id,
              region: item.nom,
              nombre: parseInt(item.nombre_unite),
            }))}
            nature={NATURE.unite}
          />
        </Col>
        <Col xs={6}>
          <Item
            title="Nombre de Groupe par region"
            rows={byRegionQuery.data.map((item: any) => ({
              id: item.id,
              region: item.nom,
              nombre: parseInt(item.nombre_groupe),
            }))}
            nature={NATURE.groupe}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrganisationDashBord;
