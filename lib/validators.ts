import { z } from "zod";
import { formatNumberWithDecimal } from "@/lib/utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must be a valid number with two decimal places."
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(255, "Name cannot exceed 255 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .max(255, "Slug cannot exceed 255 characters."),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters.")
    .max(255, "Category cannot exceed 255 characters."),
  brand: z
    .string()
    .min(3, "Brand must be at least 3 characters.")
    .max(255, "Brand cannot exceed 255 characters."),
  description: z.string().min(3, "Description must be at least 3 characters."),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "At least one image is required."),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});