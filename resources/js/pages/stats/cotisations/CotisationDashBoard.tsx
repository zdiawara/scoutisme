import { ScoutCotisation } from "./scouts";
import { useQuery } from "@tanstack/react-query";
import { statApi } from "api/stats";
import { CotisationAdulte } from "./adulte";
import { Col, Row } from "react-bootstrap";

const CotisationDashbord = () => {
  const query = useQuery({
    queryKey: ["stats_cotisations"],
    queryFn: async () => await statApi.personnes.statCotisation(),
  });

  if (query.isLoading || !query.data) {
    return null;
  }

  return (
    <>
      <Row>
        <Col xs={12} sm={6}>
          <CotisationAdulte data={query.data.adultes.data} header={query.data.adultes.header} />
        </Col>
      </Row>
      <ScoutCotisation
        data={query.data.scouts.data}
        headers={query.data.scouts.headers}
        headers_2={query.data.scouts.headers_2}
      />
    </>
  );
};

export default CotisationDashbord;
