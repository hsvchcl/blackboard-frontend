import { Product } from "@common/interfaces/product.interface";
import { StockByCategory } from "@common/interfaces/stock-by-category.interface";

export const getTopCategoriesByStock = (
  products: Product[]
): StockByCategory[] => {
  const stockMap = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.stock;
    return acc;
  }, {});

  return Object.entries(stockMap)
    .map(([category, totalStock]) => ({ category, totalStock }))
    .sort((a, b) => b.totalStock - a.totalStock) // Ordena de mayor a menor stock
    .slice(0, 4); // Toma las 3 primeras categorías
};
