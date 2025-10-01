import { FC } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { typeOrganisationApi } from "api";
import { TypeOrganisationResource } from "types/organisation.type";
import { BAR_OPTIONS } from "utils/chart";

type EffectifScoutChartProps = {
  data: Array<Record<string, any>>;
};

export const EffectifScoutChart: FC<EffectifScoutChartProps> = ({ data }) => {
  const query = useQuery({
    networkMode: "offlineFirst",
    queryKey: [QUERY_KEY.typesUnites],
    queryFn: () =>
      typeOrganisationApi.findAll<TypeOrganisationResource>({
        nature_code: "unite",
      }),
  });

  if (query.isLoading) {
    return <span>Chargement ...</span>;
  }
  if (!query.data?.data) {
    return null;
  }

  const series = query.data.data.map((e) => {
    const values = data.map((item) => item[e.code] || 0);
    return {
      name: e.membre,
      data: values,
    };
  });

  const categories = data.map((e) => e.nom);

  return (
    <Chart
      options={{
        ...BAR_OPTIONS,
        xaxis: {
          ...BAR_OPTIONS.xaxis,
          categories,
        },
      }}
      series={series}
      type="bar"
      className="apex-charts"
      height={600}
    />
  );
};
