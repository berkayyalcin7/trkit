import { describe, expect, it } from 'vitest'
import { asciifyTR } from './asciify'

describe('asciifyTR', () => {
  it('tüm Türkçe karakterleri dönüştürür', () => {
    expect(asciifyTR('çğıöşü ÇĞİÖŞÜ')).toBe('cgiosu CGIOSU')
    expect(asciifyTR('Ağrı Dağı')).toBe('Agri Dagi')
  })

  it('ASCII karakterlere dokunmaz', () => {
    expect(asciifyTR('hello world 123')).toBe('hello world 123')
    expect(asciifyTR('')).toBe('')
  })

  it('string olmayan girdide boş string döner', () => {
    expect(asciifyTR(1 as unknown as string)).toBe('')
  })
})
