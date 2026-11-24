/**
 * `as const` keeps the exact string values, so `Permission` becomes a union
 * ("product.read" | "product.create" | …) instead of plain `string`.
 */
export const PERMISSIONS = {
  productRead: 'product.read',
  productCreate: 'product.create',
  productUpdate: 'product.update',
  productDelete: 'product.delete',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export interface User {
  id: number
  name: string
  email: string
  permissions: Permission[]
}

export interface LoginResponse {
  token: string
  user: User
}
