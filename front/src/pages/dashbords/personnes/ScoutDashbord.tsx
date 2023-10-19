import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { useMemo } from "react";
import { Card, Table, ProgressBar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LINKS } from "utils";

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
    <Row>
      <Col xs={3}></Col>

      <Col xs={9}>
        <Card className="mt-3">
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
                  <th style={{ width: "35%" }}>&nbsp;</th>
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
                      <td>
                        <ProgressBar
                          variant="info"
                          now={total > 0 ? (item.cumul / total) * 100 : 0}
                          style={{ height: "5px" }}
                        />
                      </td>
                    </tr>
                  );
                })}

                <tr className="fs-4 text-primary fw-bold">
                  <td colSpan={5} className="text-center">
                    TOTAL
                  </td>
                  <td>{total}</td>
                  <td></td>
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
