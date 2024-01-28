import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import classNames from "classnames";
import { FC, Fragment } from "react";
import { Card, Table } from "react-bootstrap";

type CellProps = {
  value?: number;
};

const Cell: FC<CellProps> = ({ value }) => {
  return (
    <td
      className={classNames("text-center", {
        "text-muted": value === 0,
      })}
    >
      {value}
    </td>
  );
};

const FirstCell: FC<CellProps> = ({ value }) => {
  return <td className="text-dark fw-bold">{value}</td>;
};

export const ScoutCotisationByRegion = () => {
  const query = useQuery({
    queryKey: ["dash_scouts_cotisations_regions"],
    queryFn: async () => await statApi.personnes.cotisationScoutByRegion(),
  });

  return (
    <Card>
      <Card.Body>
        <div className="align-items-center d-sm-flex justify-content-sm-between mb-3">
          <h4 className="fw-bold text-primary text-uppercase mb-0">
            Etat des cotisations
          </h4>
        </div>
        <Table
          responsive
          bordered
          size="sm"
          className=" table-centered mb-0"
          hover
        >
          <thead className="table-light text-dark fw-bold shadow-sm">
            <tr>
              {query.data?.headers?.map((item, i) => (
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
              {query.data?.headers_2?.map((item) => (
                <th className="text-center" key={item.code}>
                  {item.nom}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-primary">
            {query.data?.data?.map((item) => (
              <tr key={item.id}>
                {query.data.headers.map((header, i) =>
                  i === 0 ? (
                    <FirstCell
                      value={item[header.code]}
                      key={header.code + "region"}
                    />
                  ) : (
                    <Fragment key={header.code + "cell"}>
                      <Cell
                        value={item[header.code]?.cotisation_a_jour}
                        key={`${header.code} a_jour`}
                      />
                      <Cell
                        value={item[header.code]?.cotisation_non_a_jour}
                        key={`${header.code} non_a_jour`}
                      />
                    </Fragment>
                  )
                )}
              </tr>
            ))}

            {/*             <tr className="fs-4 text-primary text-center fw-bold">
              <td
                colSpan={(query.data?.headers_2.length || 2) - 1}
                className="text-center"
              >
                TOTAL
              </td>
              <td>{0}</td>
              <td>{0}</td>
            </tr> */}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
