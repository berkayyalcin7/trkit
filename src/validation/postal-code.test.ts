import { describe, expect, it } from 'vitest'
import { isValidPostalCode } from './postal-code'

describe('isValidPostalCode', () => {
  it('geçerli posta kodlarını kabul eder', () => {
    expect(isValidPostalCode('01000')).toBe(true)
    expect(isValidPostalCode('34394')).toBe(true)
    expect(isValidPostalCode('81999')).toBe(true)
  })

  it('geçersiz il kodunu reddeder', () => {
    expect(isValidPostalCode('00000')).toBe(false)
    expect(isValidPostalCode('82000')).toBe(false)
    expect(isValidPostalCode('99999')).toBe(false)
  })

  it('uzunluk ve karakter hatalarını reddeder', () => {
    expect(isValidPostalCode('')).toBe(false)
    expect(isValidPostalCode('3400')).toBe(false)
    expect(isValidPostalCode('340000')).toBe(false)
    expect(isValidPostalCode('34a00')).toBe(false)
    expect(isValidPostalCode(34000 as unknown as string)).toBe(false)
  })
})
