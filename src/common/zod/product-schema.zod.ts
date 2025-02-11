import { z } from "zod";

/**
 * Schema for creating a new itinerary
 */
export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  price: z.number().min(1, "El precio debe ser mayor a 0"),
  category: z.string(),
  stock: z.number().min(1, "El stock debe ser mayor a 0"),
  sales: z.number().min(0, "Las ventas deben ser mayor o igual a 0"),
});
export type ProductZodType = z.infer<typeof productSchema>;
