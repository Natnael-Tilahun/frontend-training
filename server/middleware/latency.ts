/**
 * Adds a small delay to every API call so loading states are visible in development.
 * Change it with NUXT_MOCK_LATENCY_MS in .env (0 to disable).
 */
export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/')) return

  const { mockLatencyMs } = useRuntimeConfig(event)
  if (mockLatencyMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, mockLatencyMs))
  }
})
