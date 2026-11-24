/** One page of results from a list endpoint. Read `Paged<Product>` as "a page of products". */
export interface Paged<T> {
  items: T[]
  total: number
  page: number
  size: number
}
