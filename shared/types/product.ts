import type { ProductInput } from '../schemas/product'

/** A product as stored and returned by the API. */
export interface Product extends ProductInput {
  id: number
  /** ISO 8601 date string, e.g. "2026-11-20T09:30:00.000Z" */
  createdAt: string
}

/** Reuse a field's type instead of repeating the union. */
export type ProductStatus = Product['status']
