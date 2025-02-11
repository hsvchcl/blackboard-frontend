import { AxiosResponse } from "axios";
import { api } from "@api";
import { ApiResponse } from "@common/interfaces/api-response.interface";
import { Product } from "@common/interfaces/product.interface";
import { ProductZodType } from "@common/zod/product-schema.zod";
import { Indicator } from "@common/interfaces/indicator.interface";

export const getAllProducts = async (): Promise<
  AxiosResponse<ApiResponse<Product[]>> | undefined
> => {
  try {
    const response = await api.get("/product/all");
    return response;
  } catch (error) {
    console.error("Error al obtener los productos", error);
    return undefined;
  }
};

export const deleteProduct = async (
  id: number
): Promise<AxiosResponse<ApiResponse<undefined>> | undefined> => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response;
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    return undefined;
  }
};

export const updateProduct = async (
  product: Product | ProductZodType
): Promise<AxiosResponse<ApiResponse<Product>> | undefined> => {
  try {
    const response = await api.patch(`/product/${product.id}`, product);
    return response;
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    return undefined;
  }
};

export const createProduct = async (
  product: Product | ProductZodType
): Promise<AxiosResponse<ApiResponse<Product>> | undefined> => {
  try {
    const response = await api.post("/product", product);
    return response;
  } catch (error) {
    console.error("Error al crear el producto", error);
    return undefined;
  }
};

export const getProductByQuery = async (
  name?: string,
  priceRange?: number[],
  stockRange?: number[]
): Promise<AxiosResponse<ApiResponse<Product[]>> | undefined> => {
  try {
    const apiUrl = new URL("/api/v1/product", api.defaults.baseURL);

    if (name) {
      apiUrl.searchParams.append("name", name);
    }

    if (priceRange) {
      priceRange.forEach((price) => {
        apiUrl.searchParams.append("priceRange", price.toString());
      });
    }
    if (stockRange) {
      stockRange.forEach((stock) => {
        apiUrl.searchParams.append("stockRange", stock.toString());
      });
    }
    console.log(apiUrl.href);
    const response = await api.get(apiUrl.href);
    return response;
  } catch (error) {
    console.error("Error al obtener los productos", error);
    return undefined;
  }
};

export const getIndicators = async (): Promise<
  AxiosResponse<ApiResponse<Indicator>> | undefined
> => {
  try {
    const response = await api.get("/product/indicator-info");
    return response;
  } catch (error) {
    console.error("Error al obtener los indicadores", error);
    return undefined;
  }
};
