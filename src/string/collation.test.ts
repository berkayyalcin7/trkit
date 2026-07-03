import { describe, expect, it } from 'vitest'
import { compareTR, sortTR } from './collation'

describe('compareTR', () => {
  it('Türk alfabesi sırasını uygular', () => {
    expect(compareTR('çilek', 'ceviz')).toBeGreaterThan(0) // c < ç
    expect(compareTR('ığdır', 'iğde')).toBeLessThan(0) // ı < i
    expect(compareTR('şeker', 'sirke')).toBeGreaterThan(0) // s < ş
    expect(compareTR('üzüm', 'uzun')).toBeGreaterThan(0) // u < ü
  })

  it('büyük/küçük harf duyarsızdır', () => {
    expect(compareTR('ELMA', 'elma')).toBe(0)
    expect(compareTR('İğde', 'ığdır')).toBeGreaterThan(0)
  })

  it('ön ek durumunda kısa olan önce gelir', () => {
    expect(compareTR('an', 'ankara')).toBeLessThan(0)
    expect(compareTR('ankara', 'an')).toBeGreaterThan(0)
  })

  it('alfabe dışı karakterler harflerden sonra gelir', () => {
    expect(compareTR('a', '3')).toBeLessThan(0)
    expect(compareTR('3', 'a')).toBeGreaterThan(0)
    expect(compareTR('3', '4')).toBeLessThan(0)
    expect(compareTR('4', '3')).toBeGreaterThan(0)
  })
})

describe('sortTR', () => {
  it('string dizisini Türk alfabesine göre sıralar', () => {
    expect(sortTR(['şeker', 'çilek', 'armut', 'üzüm', 'elma', 'ığdır'])).toEqual([
      'armut',
      'çilek',
      'elma',
      'ığdır',
      'şeker',
      'üzüm',
    ])
  })

  it('selector ile nesne dizisini sıralar, orijinali değiştirmez', () => {
    const items = [{ name: 'Şırnak' }, { name: 'İzmir' }, { name: 'Adana' }]
    const sorted = sortTR(items, (c) => c.name)
    expect(sorted.map((c) => c.name)).toEqual(['Adana', 'İzmir', 'Şırnak'])
    expect(items[0]?.name).toBe('Şırnak')
  })

  it('dizi olmayan girdide boş dizi döner', () => {
    expect(sortTR('abc' as unknown as string[])).toEqual([])
  })
})
