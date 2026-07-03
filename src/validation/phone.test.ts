import { describe, expect, it } from 'vitest'
import { isValidTRPhone, normalizeTRPhone } from './phone'

// Sentetik numaralar — gerçek abone verisi değildir
describe('normalizeTRPhone', () => {
  it('kabul edilen önekleri 10 haneye indirger', () => {
    expect(normalizeTRPhone('+905321234567')).toBe('5321234567')
    expect(normalizeTRPhone('905321234567')).toBe('5321234567')
    expect(normalizeTRPhone('05321234567')).toBe('5321234567')
    expect(normalizeTRPhone('5321234567')).toBe('5321234567')
  })

  it('sabit hat alan kodlarını kabul eder', () => {
    expect(normalizeTRPhone('02121234567')).toBe('2121234567')
    expect(normalizeTRPhone('03121234567')).toBe('3121234567')
    expect(normalizeTRPhone('04621234567')).toBe('4621234567')
  })

  it('geçersiz uzunluk ve önekleri reddeder', () => {
    expect(normalizeTRPhone('532123456')).toBe(null)
    expect(normalizeTRPhone('53212345678')).toBe(null)
    expect(normalizeTRPhone('9012345678')).toBe(null) // 10 hane, 9 ile başlıyor
    expect(normalizeTRPhone('')).toBe(null)
  })

  it('ayraç içeren girdiyi reddeder', () => {
    expect(normalizeTRPhone('0532 123 45 67')).toBe(null)
    expect(normalizeTRPhone('0(532)1234567')).toBe(null)
    expect(normalizeTRPhone('0532-123-45-67')).toBe(null)
  })

  it('gövdede rakam dışı karakteri reddeder', () => {
    expect(normalizeTRPhone('5a21234567')).toBe(null) // rakamdan büyük charCode
    expect(normalizeTRPhone('5-21234567')).toBe(null) // rakamdan küçük charCode
  })

  it('geçersiz ilk haneyi reddeder', () => {
    expect(normalizeTRPhone('1321234567')).toBe(null)
    expect(normalizeTRPhone('6321234567')).toBe(null)
  })

  it('string olmayan girdiyi reddeder', () => {
    expect(normalizeTRPhone(5321234567 as unknown as string)).toBe(null)
  })
})

describe('isValidTRPhone', () => {
  it('GSM ve sabit hattı doğrular', () => {
    expect(isValidTRPhone('+905321234567')).toBe(true)
    expect(isValidTRPhone('02121234567')).toBe(true)
    expect(isValidTRPhone('05321234567', 'mobile')).toBe(true)
    expect(isValidTRPhone('02121234567', 'landline')).toBe(true)
  })

  it('tip filtresi uyuşmazlığını reddeder', () => {
    expect(isValidTRPhone('02121234567', 'mobile')).toBe(false)
    expect(isValidTRPhone('05321234567', 'landline')).toBe(false)
  })

  it('geçersiz numarayı her tipte reddeder', () => {
    expect(isValidTRPhone('12345')).toBe(false)
    expect(isValidTRPhone('12345', 'mobile')).toBe(false)
  })
})
