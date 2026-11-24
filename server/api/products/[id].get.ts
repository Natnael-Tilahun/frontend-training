import type { Product } from '#shared/types/product'

/** GET /api/products/:id */
export default defineEventHandler((event): Product => {
  const product = productRepository.findById(getIdParam(event))
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return product
})
