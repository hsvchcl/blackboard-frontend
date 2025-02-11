import { useProductStore } from "@common/hooks/useProductStore";
import { StockByCategory } from "@common/interfaces/stock-by-category.interface";
import { getTopCategoriesByStock } from "@common/utils/get-top-categories-by-stock.util";
import { useMediaQuery } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

export const PieIndicator = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dummyProducts = useProductStore((state) => state.products);

  const [categoriesByStock, setTopCategoriesByStock] = useState<
    StockByCategory[]
  >([]);

  useEffect(() => {
    const stockSummary = getTopCategoriesByStock(dummyProducts.rows);
    setTopCategoriesByStock(stockSummary);
  }, [dummyProducts]);

  return (
    <PieChart
      series={[
        {
          data: [
            ...categoriesByStock.map((cat) => ({
              label: cat.category || "uncategorized",
              value: cat.totalStock,
            })),
          ],
        },
      ]}
      // margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      width={isMobile ? 290 : 400}
      height={isMobile ? 100: 200}
      colors={["#000000", "#555555", "#888888"]}
    />
  );
};
