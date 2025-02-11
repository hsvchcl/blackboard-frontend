import { useProductStore } from "@common/hooks/useProductStore";
import { BarChart } from "@mui/x-charts";
import { DatasetType } from "@mui/x-charts/internals";

const chartSetting = {
  xAxis: [
    {
      label: "Unidades",
    },
  ],
  height: 250,
  colors: ["#000000"],
};

export const LineIndicator = () => {
  const productsInStore = useProductStore((state) => state.products);
  function valueFormatter(value: number | null) {
    return `${value}`;
  }
  return (
    <BarChart
      dataset={productsInStore.rows as unknown as DatasetType}
      yAxis={[
        {
          scaleType: "band",
          dataKey: "name",
          tickLabelStyle: {
            display: "none"
          },
        },
      ]}
      series={[{ dataKey: "sales", label: "Ventas", valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
};
