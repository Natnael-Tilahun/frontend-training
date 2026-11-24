import { PERMISSIONS } from '#shared/types/auth'

/** DELETE /api/products/:id: needs `product.delete`. Responds 204 No Content. */
export default defineEventHandler((event) => {
  requirePermission(event, PERMISSIONS.productDelete)

  if (!productRepository.remove(getIdParam(event))) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  setResponseStatus(event, 204)
  return null
})
