import { describe, expect, it } from 'vitest'
import { formatDate, formatPrice } from '../../app/utils/format'

describe('formatPrice', () => {
  it('formats a number as Ethiopian birr with two decimals', () => {
    // Intl puts a non-breaking space after the currency code, so match any whitespace.
    expect(formatPrice(1450)).toMatch(/^ETB\s1,450\.00$/)
  })
})

describe('formatDate', () => {
  it('formats an ISO date as a readable date', () => {
    expect(formatDate('2026-09-11T13:05:00.000Z')).toMatch(/11 Sept? 2026/)
  })
})
