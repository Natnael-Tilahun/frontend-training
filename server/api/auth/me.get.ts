import type { User } from '#shared/types/auth'

export default defineEventHandler((event): User => requireUser(event))
