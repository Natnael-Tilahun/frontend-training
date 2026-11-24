/**
 * The ONE place that knows how to talk to the backend:
 * base URL, auth header and what happens on 401.
 * Pages and components never call $fetch with headers themselves.
 */
export function useApi() {
  const auth = useAuthStore()

  return $fetch.create({
    baseURL: '/api',
    onRequest({ options }) {
      if (auth.token) {
        options.headers.set('Authorization', `Bearer ${auth.token}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout()
        await navigateTo('/login')
      }
    },
  })
}
