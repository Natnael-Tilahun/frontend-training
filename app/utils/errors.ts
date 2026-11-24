/**
 * Turns anything thrown into a message we can show.
 * `error` is `unknown` on purpose: a catch block can receive anything, so we narrow before reading.
 */
export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (typeof error === 'object' && error !== null) {
    // Errors from $fetch / useFetch carry the server's statusMessage in `data`.
    if ('data' in error && isRecord(error.data) && typeof error.data.statusMessage === 'string') {
      return error.data.statusMessage
    }
    if (
      'statusMessage' in error &&
      typeof error.statusMessage === 'string' &&
      error.statusMessage
    ) {
      return error.statusMessage
    }
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}

/** Reads the HTTP status code from a fetch error, if there is one. */
export function getErrorStatus(error: unknown): number | undefined {
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    return typeof error.statusCode === 'number' ? error.statusCode : undefined
  }
  return undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
