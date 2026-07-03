import { describe, expect, it } from 'vitest'
import { isValidPlate } from './plate'

describe('isValidPlate', () => {
  it('geçerli desenleri kabul eder (boşluklu ve boşluksuz)', () => {
    expect(isValidPlate('34 A 1234')).toBe(true) // 1 harf + 4 rakam
    expect(isValidPlate('06 B 12345')).toBe(true) // 1 harf + 5 rakam
    expect(isValidPlate('34 AB 123')).toBe(true) // 2 harf + 3 rakam
    expect(isValidPlate('81 CD 1234')).toBe(true) // 2 harf + 4 rakam
    expect(isValidPlate('01 ABC 12')).toBe(true) // 3 harf + 2 rakam
    expect(isValidPlate('34ABC123')).toBe(true) // 3 harf + 3 rakam, boşluksuz
  })

  it('geçersiz il kodunu reddeder', () => {
    expect(isValidPlate('00 ABC 123')).toBe(false)
    expect(isValidPlate('82 ABC 123')).toBe(false)
    expect(isValidPlate('3A ABC 123')).toBe(false)
  })

  it('plakada kullanılmayan harfleri reddeder', () => {
    expect(isValidPlate('34 QRS 12')).toBe(false)
    expect(isValidPlate('34 WA 123')).toBe(false)
    expect(isValidPlate('34 abc 123')).toBe(false) // küçük harf
  })

  it('geçersiz harf/rakam kombinasyonlarını reddeder', () => {
    expect(isValidPlate('34 AB 12')).toBe(false) // 2 harf + 2 rakam
    expect(isValidPlate('34 ABC 1234')).toBe(false) // 3 harf + 4 rakam
    expect(isValidPlate('34 A 123')).toBe(false) // 1 harf + 3 rakam
    expect(isValidPlate('34 ABCD 12')).toBe(false) // 4 harf
    expect(isValidPlate('34 123 456')).toBe(false) // harf yok
  })

  it('rakam grubunda harf içeren girdiyi reddeder', () => {
    expect(isValidPlate('34 AB 1X34')).toBe(false)
  })

  it('geçersiz uzunluk ve tipleri reddeder', () => {
    expect(isValidPlate('')).toBe(false)
    expect(isValidPlate('34 AB')).toBe(false)
    expect(isValidPlate('34 ABC 12345')).toBe(false)
    expect(isValidPlate(34 as unknown as string)).toBe(false)
  })
})
