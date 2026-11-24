import { productQuerySchema } from '#shared/schemas/product'
import type { Paged } from '#shared/types/api'
import type { Product } from '#shared/types/product'

/**
 * GET /api/products?page=1&size=10&q=mouse&status=active
 * Reads are public in this mock so Day 1 works before auth exists.
 */
export default defineEventHandler(async (event): Promise<Paged<Product>> => {
  const query = await getValidatedQuery(event, productQuerySchema.parse)
  return productRepository.list(query)
})
