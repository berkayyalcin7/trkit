import { describe, expect, it } from 'vitest'
import { addKDV, removeKDV, splitKDV } from './kdv'

describe('KDV hesapları', () => {
  it('addKDV net tutara oranı ekler', () => {
    expect(addKDV(100, 20)).toBe(120)
    expect(addKDV(100, 1)).toBe(101)
    expect(addKDV(100, 0)).toBe(100)
    expect(addKDV(99.99, 18)).toBe(117.99)
  })

  it('removeKDV brüt tutardan neti çıkarır', () => {
    expect(removeKDV(120, 20)).toBe(100)
    expect(removeKDV(118, 18)).toBe(100)
    expect(removeKDV(100, 0)).toBe(100)
  })

  it('splitKDV net/KDV/brüt ayrıştırır', () => {
    expect(splitKDV(120, 20)).toEqual({ net: 100, kdv: 20, gross: 120 })
    expect(splitKDV(0, 20)).toEqual({ net: 0, kdv: 0, gross: 0 })
  })

  it('geçersiz girdilerde null döner', () => {
    expect(addKDV(Number.NaN, 20)).toBe(null)
    expect(addKDV(100, -5)).toBe(null)
    expect(removeKDV(Number.POSITIVE_INFINITY, 20)).toBe(null)
    expect(splitKDV(120, Number.NaN)).toBe(null)
  })
})
