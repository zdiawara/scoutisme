import { ApexOptions } from "apexcharts";

export const chartOptions: ApexChart = {
  stacked: true,
  toolbar: {
    show: true,
  },
  zoom: {
    enabled: true,
  },
};

export const responsiveOptions: ApexResponsive[] = [
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
];

export const plotOptions = {
  bar: {
    horizontal: false,
    borderRadius: 5,
  },
};

export const legendOptions: ApexLegend = {
  position: "right",
  offsetY: 40,
};

export const fillOptions = {
  opacity: 1,
};

export const BAR_OPTIONS: ApexOptions = {
  chart: chartOptions,
  responsive: responsiveOptions,
  plotOptions: {
    bar: plotOptions.bar,
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
  },
  legend: legendOptions,
  fill: fillOptions,
};
