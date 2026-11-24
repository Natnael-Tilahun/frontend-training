import type { LoginInput } from '#shared/schemas/auth'
import type { LoginResponse, Permission, User } from '#shared/types/auth'

interface Session {
  token: string
  user: User
}

const STORAGE_KEY = 'inventory-admin.session'

/**
 * Setup-style store: ref = state, computed = getters, function = actions.
 * Same concepts as the options style (state / getters / actions), written like a composable.
 */
export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(readSession())

  const user = computed(() => session.value?.user ?? null)
  const token = computed(() => session.value?.token ?? '')
  const isAuthenticated = computed(() => Boolean(session.value))

  /** UI convenience only. The API checks permissions again on every request. */
  function can(permission: Permission): boolean {
    return session.value?.user.permissions.includes(permission) ?? false
  }

  async function login(credentials: LoginInput) {
    // Plain $fetch: we have no token yet, so the authenticated API wrapper is not needed.
    session.value = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
  }

  function logout() {
    session.value = null
  }

  // Keep the session in sessionStorage: survives a reload, cleared when the tab closes.
  // Trade-offs vs localStorage and httpOnly cookies: docs/05-state-and-api.md.
  watch(session, (value) => {
    if (value) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    else sessionStorage.removeItem(STORAGE_KEY)
  })

  return { user, token, isAuthenticated, can, login, logout }
})

function readSession(): Session | null {
  if (import.meta.server) return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}
