import { FC } from "react";
import { DashBoardTableFirstCell, DashBoardTable, DashBoardTableBody, DashBoardTableHead } from "../../common";
import { CotisationAdulteDataItem, CotisationAdulteHeader } from "./CotisationAdulte";

type ListAdulteCotisationProps = {
  data: CotisationAdulteDataItem[];
  header: CotisationAdulteHeader;
};

export const ListAdulteCotisation: FC<ListAdulteCotisationProps> = ({ header, data }) => {
  return (
    <DashBoardTable bordered>
      <DashBoardTableHead>
        <tr>
          <th>{header.nom}</th>
          <th className="text-center">{header.unite}</th>
          <th className="text-center">{header.groupe}</th>
          <th className="text-center">{header.region}</th>
          <th className="text-center">{header.national}</th>
        </tr>
      </DashBoardTableHead>
      <DashBoardTableBody>
        {data?.map((item) => (
          <tr key={item.code}>
            <DashBoardTableFirstCell value={item.nom} />
            <DashBoardTableFirstCell value={item.unite || 0} />
            <DashBoardTableFirstCell value={item.groupe || 0} />
            <DashBoardTableFirstCell value={item.region || 0} />
            <DashBoardTableFirstCell value={item.national || 0} />
          </tr>
        ))}
      </DashBoardTableBody>
    </DashBoardTable>
  );
};
