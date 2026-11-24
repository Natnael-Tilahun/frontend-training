import { describe, expect, it } from 'vitest'
import { getErrorMessage, getErrorStatus } from '../../app/utils/errors'

describe('getErrorMessage', () => {
  it('prefers the server statusMessage from a fetch error', () => {
    const error = { statusCode: 409, data: { statusMessage: 'SKU already exists' } }
    expect(getErrorMessage(error)).toBe('SKU already exists')
  })

  it('falls back to Error.message', () => {
    expect(getErrorMessage(new Error('Network down'))).toBe('Network down')
  })

  it('falls back to the default for anything else', () => {
    expect(getErrorMessage(42)).toBe('Something went wrong')
  })
})

describe('getErrorStatus', () => {
  it('reads statusCode when present', () => {
    expect(getErrorStatus({ statusCode: 404 })).toBe(404)
    expect(getErrorStatus('oops')).toBeUndefined()
  })
})
