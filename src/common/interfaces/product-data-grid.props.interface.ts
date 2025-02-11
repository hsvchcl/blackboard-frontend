import { Product } from "./product.interface";

interface Header {
  label: string;
  key: keyof Product;
}

export interface ProductDataGridProps {
  header: Header[];
  rows: Product[];
}
