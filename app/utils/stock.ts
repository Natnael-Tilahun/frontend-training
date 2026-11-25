/** At or below this number a product counts as "low stock". */
export const LOW_STOCK_THRESHOLD = 5

export type StockLevel = 'out' | 'low' | 'ok'

/** 0 → "out", 1–5 → "low", more → "ok" */
export function getStockLevel(stock: number): StockLevel {
  if (stock <= 0) return 'out'
  if (stock <= LOW_STOCK_THRESHOLD) return 'low'
  return 'ok'
}
