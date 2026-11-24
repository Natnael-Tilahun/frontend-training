import { computed, ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Filters a list by a text search on one or more fields.
 * Generic: works for products, users, anything with string-like fields.
 *
 * const { search, results } = useSearch(products, ['name', 'sku'])
 *
 * Vue functions are imported explicitly so this file also runs in plain Vitest.
 */
export function useSearch<T>(items: Ref<T[]>, keys: (keyof T)[]) {
  const search = ref('')

  const results = computed(() => {
    const term = search.value.trim().toLowerCase()
    if (!term) return items.value

    return items.value.filter((item) =>
      keys.some((key) =>
        String(item[key] ?? '')
          .toLowerCase()
          .includes(term),
      ),
    )
  })

  return { search, results }
}
