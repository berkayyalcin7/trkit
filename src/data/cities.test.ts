import { describe, expect, it } from 'vitest'
import { getCities, getCityByName, getCityByPlate } from './cities'

describe('getCities', () => {
  it('81 ili plaka sırasıyla döner', () => {
    const cities = getCities()
    expect(cities).toHaveLength(81)
    for (let i = 0; i < cities.length; i++) {
      expect(cities[i]?.plate).toBe(i + 1) // getCityByPlate bu sıraya güvenir
    }
  })

  it('bölge dağılımı doğrudur', () => {
    expect(getCities('Marmara')).toHaveLength(11)
    expect(getCities('Ege')).toHaveLength(8)
    expect(getCities('Akdeniz')).toHaveLength(8)
    expect(getCities('İç Anadolu')).toHaveLength(13)
    expect(getCities('Karadeniz')).toHaveLength(18)
    expect(getCities('Doğu Anadolu')).toHaveLength(14)
    expect(getCities('Güneydoğu Anadolu')).toHaveLength(9)
  })

  it('kopya döner, kaynak veri değişmez', () => {
    const first = getCities()
    first.pop()
    expect(getCities()).toHaveLength(81)
  })
})

describe('getCityByPlate', () => {
  it('plaka kodundan ili bulur', () => {
    expect(getCityByPlate(34)?.name).toBe('İstanbul')
    expect(getCityByPlate(6)?.name).toBe('Ankara')
    expect(getCityByPlate(81)?.name).toBe('Düzce')
  })

  it('aralık dışı girdide null döner', () => {
    expect(getCityByPlate(0)).toBe(null)
    expect(getCityByPlate(82)).toBe(null)
    expect(getCityByPlate(34.5)).toBe(null)
    expect(getCityByPlate('34' as unknown as number)).toBe(null)
  })
})

describe('getCityByName', () => {
  it('Türkçe karakter ve büyük/küçük harf toleranslıdır', () => {
    expect(getCityByName('İstanbul')?.plate).toBe(34)
    expect(getCityByName('istanbul')?.plate).toBe(34)
    expect(getCityByName('ISTANBUL')?.plate).toBe(34)
    expect(getCityByName('kahramanmaras')?.plate).toBe(46)
    expect(getCityByName('Sanliurfa')?.plate).toBe(63)
    expect(getCityByName('IĞDIR')?.plate).toBe(76)
  })

  it('bilinmeyen ad ve geçersiz girdide null döner', () => {
    expect(getCityByName('Atlantis')).toBe(null)
    expect(getCityByName('')).toBe(null)
    expect(getCityByName(34 as unknown as string)).toBe(null)
  })
})
