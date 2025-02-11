import { useProductStore } from "@common/hooks/useProductStore";
import { Product } from "@common/interfaces/product.interface";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";

export const BarIndicator = () => {
  const productsInStore = useProductStore((state) => state.products);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsInStore.rows);
  }, [productsInStore]);

  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: products.map((product) => product.name),
          scaleType: "band",  
        },
      ]}
      series={[
        {
          data: products.map((product) => product.stock),
        },
      ]}
      sx={{
        maxHeight: 200,
      }}
      colors={["#000000"]}
    />
  );
};
