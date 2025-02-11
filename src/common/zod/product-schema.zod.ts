import { z } from "zod";

/**
 * Schema for creating a new itinerary
 */
export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  stock: z.number(),
  sales: z.number(),
});
export type ProductZodType = z.infer<typeof productSchema>;
