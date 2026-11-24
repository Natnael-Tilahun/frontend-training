const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'ETB',
  minimumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' })

/** 1450 → "ETB 1,450.00" */
export function formatPrice(value: number): string {
  return priceFormatter.format(value)
}

/** "2026-09-11T13:05:00.000Z" → "11 Sept 2026" */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate))
}
