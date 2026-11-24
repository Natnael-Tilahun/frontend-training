export type ToastTone = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  title: string
  description?: string
  tone: ToastTone
}

let nextId = 1

/**
 * App-wide toasts. `useState` is Nuxt's shared, reactive state keyed by name,
 * which is enough for a tiny global list like this (no Pinia store needed).
 */
export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])

  function dismiss(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function show(toast: Omit<Toast, 'id'>, durationMs = 4000) {
    const id = nextId++
    toasts.value.push({ id, ...toast })
    setTimeout(() => dismiss(id), durationMs)
  }

  return {
    toasts: readonly(toasts),
    dismiss,
    success: (title: string, description?: string) => show({ title, description, tone: 'success' }),
    error: (title: string, description?: string) => show({ title, description, tone: 'error' }),
    info: (title: string, description?: string) => show({ title, description, tone: 'info' }),
  }
}
