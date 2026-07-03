import { describe, expect, it } from 'vitest'
import { isValidTCKN } from './tckn'

// Tüm değerler sentetik üretilmiştir; gerçek kişi verisi DEĞİLDİR (bkz. CONTRIBUTING.md)
const SYNTHETIC_VALID = ['10000000146', '12345678950', '11111111110']

describe('isValidTCKN', () => {
  it('geçerli sentetik numaraları kabul eder', () => {
    for (const tckn of SYNTHETIC_VALID) {
      expect(isValidTCKN(tckn), tckn).toBe(true)
    }
  })

  it('10. hane checksum uyuşmazlığını reddeder', () => {
    expect(isValidTCKN('10000000156')).toBe(false)
  })

  it('11. hane checksum uyuşmazlığını reddeder', () => {
    expect(isValidTCKN('10000000147')).toBe(false)
  })

  it('0 ile başlayan numarayı reddeder', () => {
    expect(isValidTCKN('01000000146')).toBe(false)
  })

  it('11 haneden farklı uzunlukları reddeder', () => {
    expect(isValidTCKN('')).toBe(false)
    expect(isValidTCKN('1000000014')).toBe(false)
    expect(isValidTCKN('100000001468')).toBe(false)
  })

  it('rakam dışı karakterleri reddeder', () => {
    expect(isValidTCKN('10000o00146')).toBe(false) // gövdede harf
    expect(isValidTCKN('100000001a6')).toBe(false) // 10. hanede harf
    expect(isValidTCKN('1000000014a')).toBe(false) // 11. hanede harf
    expect(isValidTCKN('10000000+46')).toBe(false) // 48'den küçük charCode
  })

  it('unicode rakamları reddeder (yalnızca ASCII 0-9)', () => {
    expect(isValidTCKN('١٠٠٠٠٠٠٠١٤٦')).toBe(false)
  })

  it('boşluklu girdiyi normalize etmez, reddeder', () => {
    expect(isValidTCKN(' 1000000146')).toBe(false)
  })

  it('string olmayan girdiyi reddeder (JS tüketicileri için)', () => {
    expect(isValidTCKN(10000000146 as unknown as string)).toBe(false)
    expect(isValidTCKN(null as unknown as string)).toBe(false)
  })
})
