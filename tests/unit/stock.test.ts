import { describe, expect, it } from 'vitest'
import { getStockLevel, LOW_STOCK_THRESHOLD } from '../../app/utils/stock'

describe('getStockLevel', () => {
  it('treats zero as out of stock', () => {
    expect(getStockLevel(0)).toBe('out')
  })

  it('treats the threshold itself as low stock', () => {
    expect(getStockLevel(1)).toBe('low')
    expect(getStockLevel(LOW_STOCK_THRESHOLD)).toBe('low')
  })

  it('treats anything above the threshold as in stock', () => {
    expect(getStockLevel(LOW_STOCK_THRESHOLD + 1)).toBe('ok')
  })
})
