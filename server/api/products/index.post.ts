import { productInputSchema } from '#shared/schemas/product'
import { PERMISSIONS } from '#shared/types/auth'
import type { Product } from '#shared/types/product'

/** POST /api/products: needs a token with `product.create`. */
export default defineEventHandler(async (event): Promise<Product> => {
  requirePermission(event, PERMISSIONS.productCreate)

  const input = await readValidatedBody(event, productInputSchema.parse)

  if (productRepository.findBySku(input.sku)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'A product with this SKU already exists',
      data: { field: 'sku' },
    })
  }

  setResponseStatus(event, 201)
  return productRepository.create(input)
})
