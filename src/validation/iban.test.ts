import { describe, expect, it } from 'vitest'
import { isValidTRIban } from './iban'

// Sentetik IBAN'lar (banka kodu 00000 gerçekte kullanılmaz)
describe('isValidTRIban', () => {
  it('geçerli sentetik IBAN kabul eder', () => {
    expect(isValidTRIban('TR200000000000000000000001')).toBe(true)
    expect(isValidTRIban('TR900000000000000000000002')).toBe(true)
  })

  it('yanlış kontrol hanesini reddeder', () => {
    expect(isValidTRIban('TR210000000000000000000001')).toBe(false)
  })

  it('26 karakterden farklı uzunlukları reddeder', () => {
    expect(isValidTRIban('')).toBe(false)
    expect(isValidTRIban('TR2000000000000000000001')).toBe(false)
    expect(isValidTRIban('TR20000000000000000000000001')).toBe(false)
  })

  it('TR dışı ülke kodunu reddeder', () => {
    expect(isValidTRIban('DE200000000000000000000001')).toBe(false)
    expect(isValidTRIban('RT200000000000000000000001')).toBe(false)
  })

  it('normalize etmez: küçük harf ve boşluk geçersizdir', () => {
    expect(isValidTRIban('tr200000000000000000000001')).toBe(false)
    expect(isValidTRIban('TR20 0000 0000 0000 0000 01')).toBe(false)
  })

  it('gövdede rakam dışı karakteri reddeder', () => {
    expect(isValidTRIban('TR20A000000000000000000001')).toBe(false)
  })

  it('string olmayan girdiyi reddeder', () => {
    expect(isValidTRIban(null as unknown as string)).toBe(false)
  })
})
