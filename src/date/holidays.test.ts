import { describe, expect, it } from 'vitest'
import {
  addWorkingDaysTR,
  getHolidaysTR,
  HOLIDAY_YEARS_TR,
  isHolidayTR,
  isWorkingDayTR,
} from './holidays'

describe('getHolidaysTR', () => {
  it('bir yılda 8 resmî + 9 dini kayıt döner, tarih sıralıdır', () => {
    const holidays = getHolidaysTR(2026)
    expect(holidays).toHaveLength(17)
    const dates = (holidays ?? []).map((h) => h.date)
    expect([...dates].sort()).toEqual(dates)
  })

  it('Diyanet ile doğrulanmış bayram tarihlerini içerir', () => {
    const h2026 = getHolidaysTR(2026) ?? []
    expect(h2026.find((h) => h.date === '2026-05-27')?.name).toBe('Kurban Bayramı 1. Günü')
    expect(h2026.find((h) => h.date === '2026-03-20')?.name).toBe('Ramazan Bayramı 1. Günü')

    const h2028 = getHolidaysTR(2028) ?? []
    expect(h2028.find((h) => h.date === '2028-02-26')?.name).toBe('Ramazan Bayramı 1. Günü')
    const arife = h2028.find((h) => h.date === '2028-02-25')
    expect(arife?.name).toBe('Ramazan Bayramı Arifesi')
    expect(arife?.halfDay).toBe(true)
    expect(arife?.kind).toBe('dini')
  })

  it("2029'da 23 Nisan hem resmî bayram hem Kurban arifesidir (çakışma)", () => {
    const matches = (getHolidaysTR(2029) ?? []).filter((h) => h.date === '2029-04-23')
    expect(matches).toHaveLength(2)
    expect(matches.map((h) => h.kind).sort()).toEqual(['dini', 'resmi'])
  })

  it('kapsam dışı ve geçersiz yıllarda null döner', () => {
    expect(getHolidaysTR(2019)).toBe(null)
    expect(getHolidaysTR(2031)).toBe(null)
    expect(getHolidaysTR(2026.5)).toBe(null)
  })

  it('desteklenen aralık sabiti doğrudur', () => {
    expect(HOLIDAY_YEARS_TR).toEqual({ from: 2020, to: 2030 })
    expect(getHolidaysTR(HOLIDAY_YEARS_TR.from)).not.toBe(null)
    expect(getHolidaysTR(HOLIDAY_YEARS_TR.to)).not.toBe(null)
  })
})

describe('isHolidayTR', () => {
  it('tam gün tatilleri tanır', () => {
    expect(isHolidayTR('2026-10-29')).toBe(true) // Cumhuriyet Bayramı
    expect(isHolidayTR('2026-05-30')).toBe(true) // Kurban Bayramı 4. Günü
    expect(isHolidayTR('2026-07-06')).toBe(false) // sıradan pazartesi
  })

  it('yarım günler varsayılan tatil değildir, opsiyonla dahil edilir', () => {
    expect(isHolidayTR('2026-10-28')).toBe(false)
    expect(isHolidayTR('2026-10-28', { includeHalfDays: true })).toBe(true)
    expect(isHolidayTR('2026-05-26')).toBe(false) // Kurban arifesi
    expect(isHolidayTR('2026-05-26', { includeHalfDays: true })).toBe(true)
  })

  it('aynı güne denk gelen tam gün tatil önceliklidir (2029-04-23)', () => {
    expect(isHolidayTR('2029-04-23')).toBe(true) // arife olsa da 23 Nisan resmî tatil
  })

  it('Date nesnesi kabul eder', () => {
    expect(isHolidayTR(new Date(2026, 9, 29))).toBe(true)
    expect(isHolidayTR(new Date('gecersiz'))).toBe(null)
  })

  it('geçersiz tarih ve kapsam dışı yılda null döner', () => {
    expect(isHolidayTR('abc')).toBe(null)
    expect(isHolidayTR('2026/07/04')).toBe(null)
    expect(isHolidayTR('2026-0a-04')).toBe(null)
    expect(isHolidayTR('2026-02-30')).toBe(null)
    expect(isHolidayTR('2026-1-1')).toBe(null)
    expect(isHolidayTR('2031-05-01')).toBe(null)
    expect(isHolidayTR(42 as unknown as string)).toBe(null)
  })
})

describe('isWorkingDayTR', () => {
  it('hafta sonu iş günü değildir', () => {
    expect(isWorkingDayTR('2026-07-04')).toBe(false) // cumartesi
    expect(isWorkingDayTR('2026-07-05')).toBe(false) // pazar
  })

  it('tam gün tatil iş günü değildir, arife iş günüdür', () => {
    expect(isWorkingDayTR('2026-05-27')).toBe(false) // Kurban 1. Günü (çarşamba)
    expect(isWorkingDayTR('2026-05-26')).toBe(true) // arife (salı) — yarım gün çalışılır
    expect(isWorkingDayTR('2026-07-03')).toBe(true) // sıradan cuma
    expect(isWorkingDayTR(new Date(2026, 6, 3))).toBe(true)
  })

  it('hafta içi + kapsam dışı yılda null döner', () => {
    expect(isWorkingDayTR('2031-01-06')).toBe(null) // pazartesi ama veri yok
    expect(isWorkingDayTR('gecersiz-t')).toBe(null)
  })
})

describe('addWorkingDaysTR', () => {
  it('bayram ve hafta sonunu atlar', () => {
    // 25 May 2026 Pzt → +1: 26 arife (çalışılır) → +2: 27-29 bayram,
    // 30 Cts (bayram 4. günü + hafta sonu), 31 Paz atlanır → 1 Haziran Pzt
    expect(addWorkingDaysTR('2026-05-25', 1)).toBe('2026-05-26')
    expect(addWorkingDaysTR('2026-05-25', 2)).toBe('2026-06-01')
  })

  it('negatif değerle geriye gider', () => {
    expect(addWorkingDaysTR('2026-06-01', -1)).toBe('2026-05-26')
  })

  it('hafta sonunu atlar, 0 gün girdiyi normalize ederek döner', () => {
    expect(addWorkingDaysTR('2026-07-03', 1)).toBe('2026-07-06') // cuma → pazartesi
    expect(addWorkingDaysTR(new Date(2026, 4, 25), 0)).toBe('2026-05-25')
  })

  it('desteklenen aralığın dışına taşarsa null döner', () => {
    expect(addWorkingDaysTR('2030-12-31', 1)).toBe(null)
    expect(addWorkingDaysTR('2020-01-02', -2)).toBe(null)
  })

  it('geçersiz girdilerde null döner', () => {
    expect(addWorkingDaysTR('2026-13-01', 5)).toBe(null)
    expect(addWorkingDaysTR('2026-07-03', 1.5)).toBe(null)
  })
})
