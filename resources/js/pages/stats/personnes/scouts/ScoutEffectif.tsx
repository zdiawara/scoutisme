import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { DashBoardWrapper } from "../../common";
import { Button } from "react-bootstrap";
import { EffectifScoutList } from "./EffectifScoutList";

export const ScoutEffectifByRegion = () => {
  const query = useQuery({
    queryKey: ["dash_scouts_regions"],
    networkMode: "offlineFirst",
    queryFn: async () => {
      const result = await statApi.personnes.byRegion();
      return result;
    },
  });

  if (query.isLoading) {
    return <span>Chargement ...</span>;
  }

  if (!query.data?.data) {
    return null;
  }

  return (
    <DashBoardWrapper defaultActiveKey="liste">
      <Button variant="light" size="sm" className="float-end">
        Exporter
      </Button>
      <h4 className="fs-5 fw-regular mt-1 mb-3">Effectif des scouts par région</h4>

      <EffectifScoutList headers={query.data?.headers} data={query.data?.data} />
      {/* <DashBoardContent>
        <Tab.Pane eventKey="liste">
          <Button variant="light" size="sm" className="mb-2">
            Exporter
          </Button>
          <EffectifScoutList headers={query.data?.headers} data={query.data?.data} />
        </Tab.Pane>
        <Tab.Pane eventKey="graphique">
          <EffectifScoutChart data={query.data?.data} />
        </Tab.Pane>
      </DashBoardContent> */}
    </DashBoardWrapper>
  );
};
