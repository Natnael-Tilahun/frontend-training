import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useSearch } from '../../app/composables/useSearch'

const items = ref([
  { name: 'Wireless Mouse', sku: 'WM-100' },
  { name: 'Mechanical Keyboard', sku: 'MK-210' },
])

describe('useSearch', () => {
  it('returns everything when the search is empty', () => {
    const { results } = useSearch(items, ['name'])
    expect(results.value).toHaveLength(2)
  })

  it('matches any of the given keys, ignoring case', () => {
    const { search, results } = useSearch(items, ['name', 'sku'])
    search.value = 'mk-2'
    expect(results.value.map((i) => i.name)).toEqual(['Mechanical Keyboard'])
  })

  it('updates when the source list changes', () => {
    const { search, results } = useSearch(items, ['name'])
    search.value = 'lamp'
    items.value.push({ name: 'Desk Lamp', sku: 'DL-LED' })
    expect(results.value).toHaveLength(1)
  })
})
