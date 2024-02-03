import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import {
  DashBoardContent,
  DashBoardDefaultHeader,
  DashBoardWrapper,
} from "pages/dashbords/common";
import { Button, Tab } from "react-bootstrap";
import { EffectifScoutList } from "./EffectifScoutList";
import { EffectifScoutChart } from "./EffectifScoutChart";

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
      <DashBoardDefaultHeader titre="Effectif des scouts" />
      <DashBoardContent>
        <Tab.Pane eventKey="liste">
          <Button variant="light" size="sm" className="mb-2">
            Exporter <i className="mdi mdi-download ms-1"></i>
          </Button>
          <EffectifScoutList
            headers={query.data?.headers}
            data={query.data?.data}
          />
        </Tab.Pane>
        <Tab.Pane eventKey="graphique">
          <EffectifScoutChart data={query.data?.data} />
        </Tab.Pane>
      </DashBoardContent>
    </DashBoardWrapper>
  );
};
