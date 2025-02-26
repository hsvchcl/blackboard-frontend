import { ProductDataGridProps } from "@common/interfaces/product-data-grid.props.interface";
import { Product } from "@common/interfaces/product.interface";
import { create } from "zustand";

interface ProductState {
  products: ProductDataGridProps;
  loading: boolean;
  setProductRows: (product: Product[]) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  reset: () => void;
  setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: {
    header: [
      {
        label: "Nombre",
        key: "name",
      },
      {
        label: "Stock",
        key: "stock",
      },
      {
        label: "Precio",
        key: "price",
      },
      {
        label: "Ventas",
        key: "sales",
      },
      {
        label: "Acciones",
        key: "action",
      },
    ],
    rows: [],
  },
  loading: true,
  deleteProduct: (id) =>
    set((state) => ({
      products: {
        ...state.products,
        rows: state.products.rows.filter((product) => product.id !== id),
      },
    })),
  reset: () =>
    set({
      products: {
        header: [
          {
            label: "Nombre",
            key: "name",
          },
          {
            label: "Stock",
            key: "stock",
          },
          {
            label: "Precio",
            key: "price",
          },
        ],
        rows: [],
      },
    }),
  setProductRows: (products) =>
    set((state) => ({
      products: {
        ...state.products,
        rows: products.map((product) => ({
          ...product,
        })),
      },
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: {
        ...state.products,
        rows: state.products.rows.map((p) =>
          p.id === product.id ? { ...product } : p
        ),
      },
    })),
  addProduct: (product) =>
    set((state) => ({
      products: {
        ...state.products,
        rows: [...state.products.rows, product],
      },
    })),
  setLoading: (loading) => set({ loading }),
}));
