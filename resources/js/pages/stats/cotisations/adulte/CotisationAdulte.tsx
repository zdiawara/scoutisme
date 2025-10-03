import { Button } from "react-bootstrap";
import { DashBoardWrapper } from "../../common";
import { FC } from "react";
import { ListAdulteCotisation } from "./ListAdulteCotisation";

export type CotisationAdulteDataItem = {
  nom: string;
  code: string;
  unite: number;
  groupe: number;
  region: number;
  national: number;
};

export type CotisationAdulteHeader = {
  nom: string;
  code: string;
  unite: string;
  groupe: string;
  region: string;
  national: string;
};

type CotisationAdulteProps = {
  data: CotisationAdulteDataItem[];
  header: CotisationAdulteHeader;
};

export const CotisationAdulte: FC<CotisationAdulteProps> = ({ data, header }) => {
  return (
    <DashBoardWrapper defaultActiveKey="liste">
      <Button variant="light" size="sm" className="float-end">
        Exporter
      </Button>
      <h4 className="fs-5 fw-regular mt-1 mb-3">Cotisation des adultes</h4>
      <ListAdulteCotisation data={data} header={header} />
    </DashBoardWrapper>
  );
};
