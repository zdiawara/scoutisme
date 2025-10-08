import { Card, Col, Row } from "react-bootstrap";
import { FC, useMemo } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { statApi } from "api/stats";
import { LoaderSpinner } from "components/loader";

type EffectifScoutUniteProps = {
  uniteId: string;
};

const options: ApexCharts.ApexOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  colors: ["#4698cfff", "#e9916eff"],
  labels: ["Garçons", "Filles"],

  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 480,
        },
        legend: {
          position: "top",
        },
      },
    },
  ],
};

export const EffectifScoutUnite: FC<EffectifScoutUniteProps> = ({ uniteId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["effectif_scout_unite", uniteId],
    queryFn: async () => {
      return await statApi.unites.effectif(uniteId);
    },
  });

  const nombreTotalScout = useMemo(() => {
    return data?.reduce((a, b) => parseInt(b.total, 10) + a, 0);
  }, [data]);

  const series = useMemo(() => {
    if (!nombreTotalScout) {
      return [];
    }
    return data?.map((i) => parseInt(i.total, 10) / nombreTotalScout);
  }, [data, nombreTotalScout]);

  if (isLoading) {
    return <LoaderSpinner className="mt-4 text-center" />;
  }

  return (
    <>
      <Row className="g-3 mt-2">
        <Col xs={12} md={4}>
          <Card className="mb-0">
            <Card.Body>
              <h5 className="text-uppercase">Nombre de scouts</h5>
              <div className="mt-2 fs-2">{nombreTotalScout}</div>
            </Card.Body>
          </Card>
        </Col>
        {data?.map((item) => (
          <Col key={item.code} xs={6} md={4}>
            <Card className="mb-0">
              <Card.Body>
                <h5 className="text-uppercase">{item.nom}</h5>
                <div className="mt-2 fs-2">{item.total}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-4 d-flex d-sm-block justify-content-center">
        <Chart options={options} series={series} type="pie" height={400} />
      </div>
    </>
  );
};
