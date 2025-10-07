import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Chart from "react-apexcharts";

export const EffectifScoutUnite = () => {
  const [state] = useState({
    series: [44, 55],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      colors: ["#e9916eff", "#4698cfff"],
      labels: ["Filles", "Garçons"],

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
        <Col xs={12} md={4}>
          <Card className="mb-0">
            <Card.Body>
              <h5 className="text-uppercase">Nombre de scouts</h5>
              <div className="mt-2 fs-2">{10}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4}>
          <Card className="mb-0">
            <Card.Body>
              <h5 className="text-uppercase">Filles</h5>
              <div className="mt-2 fs-2">{10}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4}>
          <Card className="mb-0">
            <Card.Body>
              <h5 className="text-uppercase">Garçons</h5>
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
