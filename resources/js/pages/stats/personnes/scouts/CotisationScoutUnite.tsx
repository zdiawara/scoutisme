import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Chart from "react-apexcharts";

export const CotisationScoutUnite = () => {
  const [state] = useState({
    series: [44, 55],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      colors: ["#00ff00", "#ff0000"],
      labels: ["Cotisation à jour", "Cotisation non à jour"],

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "top",
            },
          },
        },
      ],
    },
  });

  return (
    <>
      <Row className="g-3 mt-2">
        <Col xs={6} md={4}>
          <Card className="mb-0">
            <Card.Body>
              <h5 className="text-uppercase">A jour</h5>
              <div className="mt-2 fs-2">{10}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4}>
          <Card className="mb-0">
            <Card.Body>
              <h5 className="text-uppercase">Non A jour</h5>
              <div className="mt-2 fs-2">{12}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 d-flex justify-content-center">
        <Chart options={state.options} series={state.series} type="pie" height={400} />
      </div>
    </>
  );
};
