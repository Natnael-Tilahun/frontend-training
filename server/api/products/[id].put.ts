import { productInputSchema } from '#shared/schemas/product'
import { PERMISSIONS } from '#shared/types/auth'
import type { Product } from '#shared/types/product'

/** PUT /api/products/:id: needs `product.update`. Replaces all editable fields. */
export default defineEventHandler(async (event): Promise<Product> => {
  requirePermission(event, PERMISSIONS.productUpdate)

  const id = getIdParam(event)
  const input = await readValidatedBody(event, productInputSchema.parse)

  const duplicate = productRepository.findBySku(input.sku)
  if (duplicate && duplicate.id !== id) {
    throw createError({
      statusCode: 409,
      statusMessage: 'A product with this SKU already exists',
      data: { field: 'sku' },
    })
  }

  const product = productRepository.update(id, input)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return product
})
