import { Card, Col, Row } from "react-bootstrap";
import { FC } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { statApi } from "api/stats";
import { LoaderSpinner } from "components/loader";

type Props = {
  uniteId: string;
};

const options: ApexCharts.ApexOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  colors: ["#1d8f1dff", "#bb0a0aff"],
  labels: ["Cotisation à jour", "Cotisation non à jour"],

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

export const CotisationScoutUnite: FC<Props> = ({ uniteId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["cotisation_scout_unite", uniteId],
    queryFn: async () => {
      return await statApi.unites.cotisation(uniteId);
    },
  });

  if (isLoading || !data) {
    return <LoaderSpinner className="mt-4 text-center" />;
  }

  const series = data.map((d) => parseInt(d.total, 10));

  return (
    <>
      <Row className="g-3 mt-2">
        {data?.map((item) => (
          <Col key={item.code} xs={6}>
            <Card className="mb-0">
              <Card.Body>
                <h5 className="text-uppercase">{item.nom}</h5>
                <div className="mt-2 fs-2">{item.total}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {Boolean(series.length) && (
        <div className="mt-4 d-flex d-sm-block justify-content-center">
          <Chart options={options} series={series} type="pie" height={400} />
        </div>
      )}
    </>
  );
};
