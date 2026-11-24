import type { H3Event } from 'h3'
import type { Permission, User } from '#shared/types/auth'
import { demoUsers } from '../data/users'

/**
 * A deliberately simple fake token: "demo-token-<userId>".
 * Real backends issue signed tokens (e.g. JWT) that expire. Never copy this into production.
 */
export function createDemoToken(user: User): string {
  return `demo-token-${user.id}`
}

function toPublicUser({ id, name, email, permissions }: User): User {
  return { id, name, email, permissions }
}

export function findUserByCredentials(email: string, password: string): User | undefined {
  const user = demoUsers.find((u) => u.email === email && u.password === password)
  return user ? toPublicUser(user) : undefined
}

export function getUserFromEvent(event: H3Event): User | undefined {
  const header = getHeader(event, 'authorization') ?? ''
  const match = /^Bearer demo-token-(\d+)$/.exec(header)
  if (!match) return undefined

  const user = demoUsers.find((u) => u.id === Number(match[1]))
  return user ? toPublicUser(user) : undefined
}

/** Throws 401 when there is no valid token. */
export function requireUser(event: H3Event): User {
  const user = getUserFromEvent(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'You need to sign in' })
  }
  return user
}

/**
 * Throws 403 when the user lacks the permission.
 * This is the REAL security check. Hiding a button in the UI is only a convenience.
 */
export function requirePermission(event: H3Event, permission: Permission): User {
  const user = requireUser(event)
  if (!user.permissions.includes(permission)) {
    throw createError({ statusCode: 403, statusMessage: 'You do not have permission to do this' })
  }
  return user
}
