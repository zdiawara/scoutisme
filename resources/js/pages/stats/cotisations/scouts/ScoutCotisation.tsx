import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import { Button } from "react-bootstrap";
import { DashBoardWrapper } from "../../common";
import { ScoutCotisationList } from "./ScoutCotisationList";
import { FC } from "react";

type ScoutCotisationProps = {
  data: Array<Record<string, any>>;
  headers: Array<{ nom: string; code: string }>;
  headers_2: Array<{ nom: string; code: string }>;
};

export const ScoutCotisation: FC<ScoutCotisationProps> = ({ data, headers, headers_2 }) => {
  return (
    <DashBoardWrapper defaultActiveKey="liste">
      {/* <DashBoardDefaultHeader titre="Etat cotisation des scouts" />
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
      </DashBoardContent> */}

      <Button variant="light" size="sm" className="float-end">
        Exporter
      </Button>
      <h4 className="fs-5 fw-regular mt-1 mb-3">Cotisation des scouts</h4>
      <ScoutCotisationList colonneNames={headers} etatCotisationNames={headers_2} data={data} />
    </DashBoardWrapper>
  );
};
