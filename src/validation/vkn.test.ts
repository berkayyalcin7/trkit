import { describe, expect, it } from 'vitest'
import { isValidVKN } from './vkn'

// Sentetik değerler — gerçek mükellef verisi değildir
describe('isValidVKN', () => {
  it('geçerli sentetik numaraları kabul eder', () => {
    expect(isValidVKN('1234567890')).toBe(true)
    expect(isValidVKN('1111111114')).toBe(true)
  })

  it('yanlış checksum hanesini reddeder', () => {
    expect(isValidVKN('1234567891')).toBe(false)
    expect(isValidVKN('1111111115')).toBe(false)
  })

  it('10 haneden farklı uzunlukları reddeder', () => {
    expect(isValidVKN('')).toBe(false)
    expect(isValidVKN('123456789')).toBe(false)
    expect(isValidVKN('12345678901')).toBe(false)
  })

  it('rakam dışı karakterleri reddeder', () => {
    expect(isValidVKN('12345a7890')).toBe(false) // gövdede harf
    expect(isValidVKN('123456789a')).toBe(false) // son hanede harf
  })

  it('string olmayan girdiyi reddeder', () => {
    expect(isValidVKN(1234567890 as unknown as string)).toBe(false)
  })
})
