import { describe, expect, it } from 'vitest'
import { formatTRY, parseTRY } from './currency'
import { formatIBAN } from './iban'
import { maskEmail, maskIBAN, maskPhone, maskTCKN } from './mask'
import { formatTRPhone } from './phone'

// Tüm kişisel veri benzeri değerler sentetiktir
describe('formatTRPhone', () => {
  it('ulusal ve uluslararası stilde biçimlendirir', () => {
    expect(formatTRPhone('5321234567')).toBe('0 (532) 123 45 67')
    expect(formatTRPhone('+905321234567')).toBe('0 (532) 123 45 67')
    expect(formatTRPhone('02121234567', 'international')).toBe('+90 212 123 45 67')
  })

  it('geçersiz girdide null döner', () => {
    expect(formatTRPhone('12345')).toBe(null)
  })
})

describe('formatIBAN', () => {
  it("4'lü gruplar", () => {
    expect(formatIBAN('TR200000000000000000000001')).toBe('TR20 0000 0000 0000 0000 0000 01')
  })

  it('geçersiz IBAN için null döner', () => {
    expect(formatIBAN('TR210000000000000000000001')).toBe(null)
  })
})

describe('formatTRY', () => {
  it('binlik ve ondalık ayraçları Türk formatında yazar', () => {
    expect(formatTRY(1250.75)).toBe('1.250,75 ₺')
    expect(formatTRY(1234567.5, { symbol: 'TL' })).toBe('1.234.567,50 TL')
    expect(formatTRY(0)).toBe('0,00 ₺')
    expect(formatTRY(999)).toBe('999,00 ₺')
    expect(formatTRY(42.019)).toBe('42,02 ₺') // kuruşa yuvarlanır
  })

  it('negatif ve sembolsüz biçimler', () => {
    expect(formatTRY(-1250.5)).toBe('-1.250,50 ₺')
    expect(formatTRY(1250.75, { symbol: 'none' })).toBe('1.250,75')
    expect(formatTRY(-0.001)).toBe('0,00 ₺') // eksi sıfır üretmez
  })

  it('sonlu olmayan ve taşan değerlerde null döner', () => {
    expect(formatTRY(Number.NaN)).toBe(null)
    expect(formatTRY(Number.POSITIVE_INFINITY)).toBe(null)
    expect(formatTRY(1e16)).toBe(null)
  })
})

describe('parseTRY', () => {
  it('sembollü ve sembolsüz metinleri çözer', () => {
    expect(parseTRY('1.250,75 ₺')).toBe(1250.75)
    expect(parseTRY('1.250,75 TL')).toBe(1250.75)
    expect(parseTRY('₺1.250,75')).toBe(1250.75)
    expect(parseTRY('1250,75')).toBe(1250.75)
    expect(parseTRY('-1.250,75')).toBe(-1250.75)
    expect(parseTRY('1.250')).toBe(1250)
  })

  it('çözümlenemeyen metinlerde null döner', () => {
    expect(parseTRY('abc')).toBe(null)
    expect(parseTRY('')).toBe(null)
    expect(parseTRY('₺')).toBe(null)
    expect(parseTRY('12,34,56')).toBe(null) // birden çok virgül
    expect(parseTRY('1e5')).toBe(null)
    expect(parseTRY('0x10')).toBe(null)
    expect(parseTRY('.')).toBe(null)
    expect(parseTRY('-,')).toBe(null)
    expect(parseTRY(1250 as unknown as string)).toBe(null)
  })
})

describe('KVKK maskeleme', () => {
  it('maskTCKN: ilk 3 + son 2 görünür', () => {
    expect(maskTCKN('10000000146')).toBe('100******46')
    expect(maskTCKN('12345678901')).toBe(null)
  })

  it('maskPhone: alan kodu + son 2 görünür', () => {
    expect(maskPhone('+905321234567')).toBe('532*****67')
    expect(maskPhone('12345')).toBe(null)
  })

  it('maskIBAN: TRxx + son 4 görünür', () => {
    expect(maskIBAN('TR200000000000000000000001')).toBe('TR20******************0001')
    expect(maskIBAN('TR210000000000000000000001')).toBe(null)
  })

  it('maskEmail: yerel kısmın ilk 2 karakteri görünür', () => {
    expect(maskEmail('berkay@example.com')).toBe('be***@example.com')
    expect(maskEmail('ab@example.com')).toBe('***@example.com')
    expect(maskEmail('a@example.com')).toBe('***@example.com')
  })

  it('maskEmail: bozuk adreslerde null döner', () => {
    expect(maskEmail('not-an-email')).toBe(null)
    expect(maskEmail('@example.com')).toBe(null)
    expect(maskEmail('a@b@example.com')).toBe(null)
    expect(maskEmail('a@nodot')).toBe(null)
    expect(maskEmail('a@.com')).toBe(null)
    expect(maskEmail('a@com.')).toBe(null)
    expect(maskEmail('a b@example.com')).toBe(null)
    expect(maskEmail(null as unknown as string)).toBe(null)
  })
})
