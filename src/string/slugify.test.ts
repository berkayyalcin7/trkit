import { describe, expect, it } from 'vitest'
import { slugifyTR } from './slugify'

describe('slugifyTR', () => {
  it('Türkçe karakterleri doğru eşler', () => {
    expect(slugifyTR('Ağrı Dağı')).toBe('agri-dagi')
    expect(slugifyTR('Şanlıurfa GÜNEŞİ')).toBe('sanliurfa-gunesi')
    expect(slugifyTR('IĞDIR ısparta')).toBe('igdir-isparta')
  })

  it('kesme işaretlerini ayraçsız atar', () => {
    expect(slugifyTR("İstanbul Boğazı'nda yürüyüş")).toBe('istanbul-bogazinda-yuruyus')
    expect(slugifyTR('Türkiye’de yazılım')).toBe('turkiyede-yazilim')
  })

  it('noktalama ve ardışık ayraçları tek ayraca indirir', () => {
    expect(slugifyTR('  Merhaba,   Dünya!! ')).toBe('merhaba-dunya')
    expect(slugifyTR('a - b _ c')).toBe('a-b-c')
  })

  it('özel ayraç kullanabilir', () => {
    expect(slugifyTR('Ağrı Dağı', '_')).toBe('agri_dagi')
  })

  it('rakamları korur, baş/son ayraç bırakmaz', () => {
    expect(slugifyTR('2026 Yol Haritası!')).toBe('2026-yol-haritasi')
    expect(slugifyTR('!!!')).toBe('')
    expect(slugifyTR('')).toBe('')
  })
})
