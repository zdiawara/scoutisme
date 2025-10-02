import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { DashBoardWrapper } from "../../common";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { EffectifScoutList } from "./EffectifScoutList";
import { useMemo } from "react";

export const ScoutEffectifByRegion = () => {
  const query = useQuery({
    queryKey: ["dash_scouts_regions"],
    networkMode: "offlineFirst",
    queryFn: async () => {
      const result = await statApi.personnes.byRegion();
      return result;
    },
  });

  const cumul = useMemo(() => {
    return (
      query.data?.headers
        .filter((e) => !["cumul", "nom"].includes(e.code))
        .map((header) => {
          return {
            label: header.nom,
            code: header.code,
            value: query.data.data.map((e) => e[header.code] || 0).reduce((a, b) => a + b, 0),
          };
        }) || []
    );
  }, [query.data]);

  if (query.isLoading) {
    return <span>Chargement ...</span>;
  }

  if (!query.data?.data) {
    return null;
  }

  return (
    <Container>
      <Row className="g-3 mb-3">
        {cumul.map((item) => (
          <Col xs={6} sm={3} key={item.code}>
            <Card className="mb-0">
              <Card.Body>
                <h5 className="text-uppercase">{item.label}</h5>
                <div className="mt-2 fs-2">{item.value}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <DashBoardWrapper defaultActiveKey="liste">
        <Button variant="light" size="sm" className="float-end">
          Exporter
        </Button>
        <h4 className="fs-5 fw-regular mt-1 mb-3">Effectif des scouts par région</h4>
        <EffectifScoutList headers={query.data?.headers} data={query.data?.data} />
      </DashBoardWrapper>
    </Container>
  );
};
