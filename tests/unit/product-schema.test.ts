import { describe, expect, it } from 'vitest'
import { productInputSchema, productQuerySchema } from '#shared/schemas/product'

const validProduct = {
  name: 'Wireless Mouse',
  sku: 'WM-100',
  price: '850',
  stock: '42',
  status: 'active',
}

describe('productInputSchema', () => {
  it('accepts a valid product and coerces numeric strings', () => {
    const result = productInputSchema.parse(validProduct)
    expect(result.price).toBe(850)
    expect(result.stock).toBe(42)
  })

  it('rejects a lowercase SKU with a helpful message', () => {
    const result = productInputSchema.safeParse({ ...validProduct, sku: 'wm-100' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('Use 3–20 capital letters, digits or dashes')
  })

  it('rejects negative stock', () => {
    expect(productInputSchema.safeParse({ ...validProduct, stock: -1 }).success).toBe(false)
  })
})

describe('productQuerySchema', () => {
  it('fills in defaults', () => {
    expect(productQuerySchema.parse({})).toEqual({ page: 1, size: 10, status: 'all' })
  })
})
