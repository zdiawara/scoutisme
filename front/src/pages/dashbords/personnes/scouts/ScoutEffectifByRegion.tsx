import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { useMemo } from "react";
import { Button, Card, Table } from "react-bootstrap";

export const ScoutEffectifByRegion = () => {
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
    <Card>
      <Card.Body>
        <Button variant="light" size="sm" className="float-end">
          Exporter <i className="mdi mdi-download ms-1"></i>
        </Button>
        <h4 className="text-primary mb-3 text-uppercase">
          Effectif des scouts
        </h4>
        <Table
          responsive
          bordered
          className="table table-sm table-centered mb-0 font-14"
        >
          <thead className="table-light shadow-sm">
            <tr>
              {byRegionQuery.data?.headers?.map((item) => (
                <th key={item.code}>{item.nom}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {byRegionQuery.data?.data?.map((item) => (
              <tr key={item.id}>
                {byRegionQuery.data.headers.map((header, i) => (
                  <td className="text-dark" key={i}>
                    {item[header.code]}
                  </td>
                ))}
              </tr>
            ))}

            <tr className="fs-4 text-primary fw-bold">
              <td
                colSpan={(byRegionQuery.data?.headers?.length || 1) - 1}
                className="text-center"
              >
                TOTAL
              </td>
              <td>{total}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
