import { FC } from "react";
import Chart from "react-apexcharts";
import { BAR_OPTIONS } from "utils/chart";

type ScoutCotisationChartProps = {
  data: Array<Record<string, any>>;
};

export const ScoutCotisationChart: FC<ScoutCotisationChartProps> = ({
  data,
}) => {
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

  const categories = data.map((e) => e.nom);

  return (
    <Chart
      options={{
        ...BAR_OPTIONS,
        colors: ["#727cf5", "#e3eaef"],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          ...BAR_OPTIONS.xaxis,
          categories,
        },
      }}
      series={apexBarChartData}
      type="bar"
      className="apex-charts"
      height={600}
    />
  );
};
