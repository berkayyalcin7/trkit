import { describe, expect, it } from 'vitest'
import { capitalizeTR, titleCaseTR, toLowerTR, toUpperTR } from './case'

describe('toUpperTR', () => {
  it('i→İ ve ı→I dönüşümünü doğru yapar', () => {
    expect(toUpperTR('istanbul')).toBe('İSTANBUL')
    expect(toUpperTR('ığdır')).toBe('IĞDIR')
    expect(toUpperTR('diyarbakır izmir')).toBe('DİYARBAKIR İZMİR')
  })

  it('diğer Türkçe karakterleri korur', () => {
    expect(toUpperTR('çğöşü')).toBe('ÇĞÖŞÜ')
  })

  it('string olmayan girdide boş string döner', () => {
    expect(toUpperTR(42 as unknown as string)).toBe('')
  })
})

describe('toLowerTR', () => {
  it('İ→i ve I→ı dönüşümünü doğru yapar', () => {
    expect(toLowerTR('İSTANBUL')).toBe('istanbul')
    expect(toLowerTR('ISPARTA')).toBe('ısparta')
    expect(toLowerTR('DİYARBAKIR')).toBe('diyarbakır')
  })

  it('kombine nokta üretmez (İ→i̇ hatası)', () => {
    expect(toLowerTR('İ').length).toBe(1)
  })

  it('string olmayan girdide boş string döner', () => {
    expect(toLowerTR(42 as unknown as string)).toBe('')
  })
})

describe('capitalizeTR', () => {
  it('ilk harfi Türkçe kurallarıyla büyütür', () => {
    expect(capitalizeTR('iSTANBUL')).toBe('İstanbul')
    expect(capitalizeTR('ığdır')).toBe('Iğdır')
    expect(capitalizeTR('şanlıurfa')).toBe('Şanlıurfa')
  })

  it('boş string ile başa çıkar', () => {
    expect(capitalizeTR('')).toBe('')
  })
})

describe('titleCaseTR', () => {
  it('her kelimeyi büyütür', () => {
    expect(titleCaseTR('ağrı dağı etekleri')).toBe('Ağrı Dağı Etekleri')
    expect(titleCaseTR('İZMİR VE ISPARTA')).toBe('İzmir Ve Isparta')
  })

  it('ardışık boşlukları korur', () => {
    expect(titleCaseTR('a  b')).toBe('A  B')
  })

  it('string olmayan girdide boş string döner', () => {
    expect(titleCaseTR(null as unknown as string)).toBe('')
  })
})
