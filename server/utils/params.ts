import type { H3Event } from 'h3'

/** Reads `[id]` from the route and fails with 400 if it is not a positive integer. */
export function getIdParam(event: H3Event): number {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id < 1) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }
  return id
}
