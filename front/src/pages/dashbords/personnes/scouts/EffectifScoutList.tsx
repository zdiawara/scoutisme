import {
  DashBoardTable,
  DashBoardTableBody,
  DashBoardTableCell,
  DashBoardTableHead,
} from "pages/dashbords/common";
import { FC, useMemo } from "react";
import { DashHeaderItem } from "types/dashboard.type";

type EffectifScoutListProps = {
  headers: DashHeaderItem[];
  data: any[];
};
export const EffectifScoutList: FC<EffectifScoutListProps> = ({
  data,
  headers,
}) => {
  const total = useMemo(() => {
    return data.map((e) => parseInt(e.cumul)).reduce((c, p) => p + c, 0) || 0;
  }, [data]);

  return (
    <>
      <DashBoardTable>
        <DashBoardTableHead>
          <tr>
            {headers?.map((item) => (
              <th className="text-center" key={item.code}>
                {item.nom}
              </th>
            ))}
          </tr>
        </DashBoardTableHead>
        <DashBoardTableBody>
          {data?.map((item) => (
            <tr key={item.id}>
              {headers.map((header, i) => (
                <DashBoardTableCell key={i} value={item[header.code]} />
              ))}
            </tr>
          ))}
          <tr className="fs-4 fw-bold">
            <td colSpan={(headers?.length || 1) - 1} className="text-center">
              Total
            </td>
            <DashBoardTableCell value={total} />
          </tr>
        </DashBoardTableBody>
      </DashBoardTable>
    </>
  );
};
