import { z } from 'zod'

/**
 * Product schemas are shared by the app (form validation) and the server
 * (request validation). One source of truth: change a rule here and both sides follow.
 */

export const productStatusSchema = z.enum(['active', 'archived'])

export const productInputSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must have at least 2 characters')
    .max(80, 'Name must have at most 80 characters'),
  sku: z
    .string({ required_error: 'SKU is required' })
    .trim()
    .regex(/^[A-Z0-9-]{3,20}$/, 'Use 3–20 capital letters, digits or dashes'),
  // Form inputs give strings; `coerce` turns "12.5" into 12.5 before validating.
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be more than 0'),
  stock: z.coerce
    .number({ invalid_type_error: 'Stock must be a number' })
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
  status: productStatusSchema,
  description: z.string().trim().max(500, 'Keep the description under 500 characters').optional(),
})

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(100).default(10),
  q: z.string().trim().optional(),
  status: z.union([productStatusSchema, z.literal('all')]).default('all'),
})

export type ProductInput = z.infer<typeof productInputSchema>
export type ProductQuery = z.input<typeof productQuerySchema>
