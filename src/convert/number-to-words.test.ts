import { describe, expect, it } from 'vitest'
import { numberToOrdinalTR, numberToWordsTR } from './number-to-words'

describe('numberToWordsTR', () => {
  it('temel sayıları çevirir', () => {
    expect(numberToWordsTR(0)).toBe('sıfır')
    expect(numberToWordsTR(7)).toBe('yedi')
    expect(numberToWordsTR(13)).toBe('on üç')
    expect(numberToWordsTR(45)).toBe('kırk beş')
    expect(numberToWordsTR(100)).toBe('yüz')
    expect(numberToWordsTR(105)).toBe('yüz beş')
    expect(numberToWordsTR(250)).toBe('iki yüz elli')
    expect(numberToWordsTR(999)).toBe('dokuz yüz doksan dokuz')
  })

  it("'bir bin' demez, 'bir milyon' der", () => {
    expect(numberToWordsTR(1000)).toBe('bin')
    expect(numberToWordsTR(1001)).toBe('bin bir')
    expect(numberToWordsTR(2024)).toBe('iki bin yirmi dört')
    expect(numberToWordsTR(1000000)).toBe('bir milyon')
    expect(numberToWordsTR(1000001)).toBe('bir milyon bir') // ara grup atlanır
    expect(numberToWordsTR(1e12)).toBe('bir trilyon')
  })

  it('negatif sayılar', () => {
    expect(numberToWordsTR(-42)).toBe('eksi kırk iki')
  })

  it('para modunda lira/kuruş okur', () => {
    expect(numberToWordsTR(1250.75, { currency: true })).toBe(
      'bin iki yüz elli lira yetmiş beş kuruş',
    )
    expect(numberToWordsTR(10, { currency: true })).toBe('on lira')
    expect(numberToWordsTR(0.5, { currency: true })).toBe('elli kuruş')
    expect(numberToWordsTR(0, { currency: true })).toBe('sıfır lira')
    expect(numberToWordsTR(-3.25, { currency: true })).toBe('eksi üç lira yirmi beş kuruş')
    expect(numberToWordsTR(-0.001, { currency: true })).toBe('sıfır lira') // eksi sıfır olmaz
  })

  it('aralık dışı ve çözümsüz girdilerde null döner', () => {
    expect(numberToWordsTR(1e15)).toBe(null)
    expect(numberToWordsTR(1.5)).toBe(null)
    expect(numberToWordsTR(Number.NaN)).toBe(null)
    expect(numberToWordsTR(Number.NaN, { currency: true })).toBe(null)
    expect(numberToWordsTR(1e16, { currency: true })).toBe(null)
  })
})

describe('numberToOrdinalTR', () => {
  it('ünlü uyumuna göre doğru ekleri kullanır', () => {
    expect(numberToOrdinalTR(1)).toBe('birinci')
    expect(numberToOrdinalTR(2)).toBe('ikinci')
    expect(numberToOrdinalTR(3)).toBe('üçüncü')
    expect(numberToOrdinalTR(4)).toBe('dördüncü')
    expect(numberToOrdinalTR(5)).toBe('beşinci')
    expect(numberToOrdinalTR(6)).toBe('altıncı')
    expect(numberToOrdinalTR(9)).toBe('dokuzuncu')
    expect(numberToOrdinalTR(10)).toBe('onuncu')
    expect(numberToOrdinalTR(40)).toBe('kırkıncı')
    expect(numberToOrdinalTR(90)).toBe('doksanıncı')
  })

  it('çok kelimeli sayılarda son kelimeyi çevirir', () => {
    expect(numberToOrdinalTR(21)).toBe('yirmi birinci')
    expect(numberToOrdinalTR(100)).toBe('yüzüncü')
    expect(numberToOrdinalTR(200)).toBe('iki yüzüncü')
    expect(numberToOrdinalTR(1000)).toBe('bininci')
    expect(numberToOrdinalTR(1000000)).toBe('bir milyonuncu')
    expect(numberToOrdinalTR(0)).toBe('sıfırıncı')
  })

  it('negatif ve aralık dışı girdide null döner', () => {
    expect(numberToOrdinalTR(-1)).toBe(null)
    expect(numberToOrdinalTR(1.5)).toBe(null)
    expect(numberToOrdinalTR(1e15)).toBe(null)
  })
})
