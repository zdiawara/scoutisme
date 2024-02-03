import { FC, Fragment } from "react";
import {
  DashBoardTableCell,
  DashBoardTableFirstCell,
  DashBoardTable,
  DashBoardTableBody,
  DashBoardTableHead,
} from "pages/dashbords/common";
import { DashHeaderItem } from "types/dashboard.type";

type ScoutCotisationListProps = {
  data: Array<Record<string, any>>;
  colonneNames: DashHeaderItem[];
  etatCotisationNames: DashHeaderItem[];
};

export const ScoutCotisationList: FC<ScoutCotisationListProps> = ({
  colonneNames,
  etatCotisationNames,
  data,
}) => {
  return (
    <>
      <DashBoardTable>
        <DashBoardTableHead>
          <tr>
            {colonneNames?.map((item, i) => (
              <th
                rowSpan={i === 0 ? 2 : 1}
                colSpan={i === 0 ? 0 : 2}
                key={item.code}
                className="text-center"
              >
                {item.nom}
              </th>
            ))}
          </tr>
          <tr>
            {etatCotisationNames?.map((item) => (
              <th className="text-center" key={item.code}>
                {item.nom}
              </th>
            ))}
          </tr>
        </DashBoardTableHead>
        <DashBoardTableBody>
          {data?.map((item) => (
            <tr key={item.id}>
              {colonneNames.map((header, i) =>
                i === 0 ? (
                  <DashBoardTableFirstCell
                    value={item[header.code]}
                    key={header.code + "region"}
                  />
                ) : (
                  <Fragment key={header.code + "cell"}>
                    <DashBoardTableCell
                      value={item[header.code]?.cotisation_a_jour}
                      key={`${header.code} a_jour`}
                    />
                    <DashBoardTableCell
                      value={item[header.code]?.cotisation_non_a_jour}
                      key={`${header.code} non_a_jour`}
                    />
                  </Fragment>
                )
              )}
            </tr>
          ))}
        </DashBoardTableBody>
      </DashBoardTable>
    </>
  );
};
