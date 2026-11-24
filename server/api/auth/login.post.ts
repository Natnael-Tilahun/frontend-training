import { loginSchema } from '#shared/schemas/auth'
import type { LoginResponse } from '#shared/types/auth'

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  // Validates the body with the SAME schema the login form uses. Invalid body → 400.
  const { email, password } = await readValidatedBody(event, loginSchema.parse)

  const user = findUserByCredentials(email, password)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Wrong email or password' })
  }

  return { token: createDemoToken(user), user }
})
