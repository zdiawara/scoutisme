import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { Button, Tab } from "react-bootstrap";
import {
  DashBoardContent,
  DashBoardDefaultHeader,
  DashBoardWrapper,
} from "pages/dashbords/common";
import { ScoutCotisationList } from "./ScoutCotisationList";
import { ScoutCotisationChart } from "./ScoutCotisationChart";

export const ScoutCotisation = () => {
  const query = useQuery({
    queryKey: ["dash_scouts_cotisations_regions"],
    queryFn: async () => await statApi.personnes.cotisationScoutByRegion(),
  });

  if (query.isLoading || !query.data) {
    return null;
  }

  return (
    <DashBoardWrapper defaultActiveKey="liste">
      <DashBoardDefaultHeader titre="Etat de la cotisation" />
      <DashBoardContent>
        <Tab.Pane eventKey="liste">
          <Button variant="light" size="sm" className="mb-2">
            Exporter <i className="mdi mdi-download ms-1"></i>
          </Button>
          <ScoutCotisationList
            colonneNames={query.data?.headers}
            etatCotisationNames={query.data?.headers_2}
            data={query.data?.data}
          />
        </Tab.Pane>
        <Tab.Pane eventKey="graphique">
          <ScoutCotisationChart data={query.data?.data} />
        </Tab.Pane>
      </DashBoardContent>
    </DashBoardWrapper>
  );
};
