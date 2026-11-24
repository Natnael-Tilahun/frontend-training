import type { ProductInput, ProductQuery } from '#shared/schemas/product'
import type { Paged } from '#shared/types/api'
import type { Product } from '#shared/types/product'

/** Every product API call lives here, fully typed. */
export function useProducts() {
  const api = useApi()

  return {
    list: (query: ProductQuery = {}) => api<Paged<Product>>('/products', { query }),
    get: (id: number) => api<Product>(`/products/${id}`),
    create: (input: ProductInput) => api<Product>('/products', { method: 'POST', body: input }),
    update: (id: number, input: ProductInput) =>
      api<Product>(`/products/${id}`, { method: 'PUT', body: input }),
    remove: async (id: number): Promise<void> => {
      await api(`/products/${id}`, { method: 'DELETE' })
    },
  }
}
