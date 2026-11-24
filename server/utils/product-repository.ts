import type { Paged } from '#shared/types/api'
import type { Product } from '#shared/types/product'
import type { ProductInput, productQuerySchema } from '#shared/schemas/product'
import type { z } from 'zod'
import { seedProducts } from '../data/products'

type ParsedProductQuery = z.output<typeof productQuerySchema>

// In-memory "database". Files in server/utils are auto-imported in server routes.
let products: Product[] = structuredClone(seedProducts)
let nextId = Math.max(...products.map((p) => p.id)) + 1

export const productRepository = {
  list({ page, size, q, status }: ParsedProductQuery): Paged<Product> {
    const search = q?.toLowerCase()

    const filtered = products
      .filter((p) => status === 'all' || p.status === status)
      .filter(
        (p) =>
          !search || p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search),
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    const start = (page - 1) * size

    return {
      items: filtered.slice(start, start + size),
      total: filtered.length,
      page,
      size,
    }
  },

  findById(id: number): Product | undefined {
    return products.find((p) => p.id === id)
  },

  findBySku(sku: string): Product | undefined {
    return products.find((p) => p.sku === sku)
  },

  create(input: ProductInput): Product {
    const product: Product = { ...input, id: nextId++, createdAt: new Date().toISOString() }
    products.push(product)
    return product
  },

  update(id: number, input: ProductInput): Product | undefined {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return undefined

    const updated: Product = { ...products[index]!, ...input }
    products[index] = updated
    return updated
  },

  remove(id: number): boolean {
    const before = products.length
    products = products.filter((p) => p.id !== id)
    return products.length < before
  },
}
