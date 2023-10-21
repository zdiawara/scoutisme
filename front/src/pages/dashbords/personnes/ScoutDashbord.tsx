import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import classNames from "classnames";
import { useMemo } from "react";
import { Card, Table, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LINKS } from "utils";

const TABS = [
  {
    label: "Région",
    code: "fiche",
    description: "Repartition des scouts par région",
  },
  {
    label: "Confession",
    code: "direction",
    description: "Effectif des scouts par confession réligieuse",
  },
  {
    label: "Genre",
    code: "scouts",
    description: "Nombre de scouts par genre",
  },
];

const Channels = () => {
  const byRegionQuery = useQuery({
    queryKey: ["dash_scouts_regions"],
    networkMode: "offlineFirst",
    queryFn: async () => {
      const result = await statApi.personnes.byRegion();
      return result;
    },
  });

  const total = useMemo(() => {
    return (
      byRegionQuery.data?.data
        .map((e) => parseInt(e.cumul))
        .reduce((c, p) => p + c, 0) || 0
    );
  }, [byRegionQuery.data?.data]);

  return (
    <Row className="mt-3">
      <Col xs={3}>
        <Card>
          <Card.Header className="bg-light">SCOUTS</Card.Header>
          <Card.Body className="p-1">
            <ListGroup defaultActiveKey="#link1">
              {TABS.map((item) => (
                <ListGroup.Item
                  key={item.code}
                  className={classNames("border-0 rounded", {
                    //active: item.code === page,
                  })}
                  action
                  //onClick={onSelectPage(item.code)}
                >
                  <span className="text-black">{item.label}</span>
                  <div>{item.description}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="text-black">
          <Card.Header className="bg-light">ADULTES</Card.Header>
          <Card.Body className="p-1">
            <ListGroup defaultActiveKey="#link1">
              {TABS.map((item) => (
                <ListGroup.Item
                  key={item.code}
                  className={classNames("border-0 rounded", {
                    //active: item.code === page,
                  })}
                  action
                  //onClick={onSelectPage(item.code)}
                >
                  {item.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={9}>
        <Card>
          <Card.Body>
            <Link to="#" className="p-0 float-end">
              Export <i className="mdi mdi-download ms-1"></i>
            </Link>
            <h4 className="header-title  mt-1 mb-3">scouts par région</h4>
            <Table
              responsive
              className="table table-sm table-centered mb-0 font-14"
            >
              <thead className="table-light">
                <tr>
                  {byRegionQuery.data?.headers?.map((item) => (
                    <th key={item.code}>{item.nom}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {byRegionQuery.data?.data?.map((item) => {
                  return (
                    <tr>
                      {byRegionQuery.data.headers.map((header, i) => {
                        if (i === 0) {
                          return (
                            <td key={i}>
                              <Link
                                className="text-primary text-decoration-underline"
                                to={LINKS.organisations.view(item.id)}
                              >
                                {item[header.code]}
                              </Link>
                            </td>
                          );
                        }
                        return <td key={i}>{item[header.code]}</td>;
                      })}
                    </tr>
                  );
                })}

                <tr className="fs-4 text-primary fw-bold">
                  <td colSpan={5} className="text-center">
                    TOTAL
                  </td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Channels;
