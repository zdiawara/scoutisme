import { useQuery } from "@tanstack/react-query";
import { statApi } from "api";
import classNames from "classnames";
import { FC, Fragment } from "react";
import { Card, Table } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

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

const OPTIONS: ApexOptions = {
  chart: {
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  colors: ["#727cf5", "#e3eaef"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      "Boucle du Mouhoun",
      "Cascades",
      "Centre",
      "Centre-Est",
      "Centre-Nord",
      "Centre-Ouest",
      "Centre-Sud",
      "Est",
      "Hauts-Bassins",
      "Nord",
      "Plateau central",
      "Sahel",
      "Sud-Ouest",
    ],
    axisBorder: {
      show: false,
    },
  },
  legend: {
    position: "left",
    offsetY: 40,
  },
  fill: {
    opacity: 1,
  },
};

export const ScoutCotisationByRegion = () => {
  const query = useQuery({
    queryKey: ["dash_scouts_cotisations_regions"],
    queryFn: async () => await statApi.personnes.cotisationScoutByRegion(),
  });

  if (query.isLoading) {
    return null;
  }

  return (
    <>
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
      <PerformanceChart data={query.data?.data || []} />
    </>
  );
};

const PerformanceChart: FC<{ data: any[] }> = ({ data }) => {
  const cotisationsAJour = data.map((item) => item.cumul.cotisation_a_jour);
  const cotisationsNonAJour = data.map(
    (item) => item.cumul.cotisation_non_a_jour
  );

  const apexBarChartData = [
    {
      name: "Cotisation à jour",
      data: cotisationsAJour,
    },
    {
      name: "Cotisation non à jour",
      data: cotisationsNonAJour,
    },
  ];

  return (
    <Card>
      <Card.Body>
        <Chart
          options={OPTIONS}
          series={apexBarChartData}
          type="bar"
          className="apex-charts"
          height={255}
        />
      </Card.Body>
    </Card>
  );
};
