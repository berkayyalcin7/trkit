export type TRHolidayKind = 'resmi' | 'dini'

export interface TRHoliday {
  /** ISO biçiminde tarih: 'YYYY-MM-DD' */
  date: string
  name: string
  kind: TRHolidayKind
  /** Arife günleri ve 28 Ekim: öğleden sonra tatil, resmî olarak yarım gün çalışılır */
  halfDay: boolean
}

export interface HolidayOptions {
  /** true verilirse arife ve 28 Ekim yarım günleri de tatil sayılır */
  includeHalfDays?: boolean
}

// Diyanet İşleri Başkanlığı takvimiyle doğrulanmış bayram 1. günleri.
// Kaynak: vakithesaplama.diyanet.gov.tr — arife her zaman 1. günün bir gün öncesidir.
const RELIGIOUS_FIRST_DAYS: Readonly<Record<number, { ramazan: string; kurban: string }>> = {
  2020: { ramazan: '2020-05-24', kurban: '2020-07-31' },
  2021: { ramazan: '2021-05-13', kurban: '2021-07-20' },
  2022: { ramazan: '2022-05-02', kurban: '2022-07-09' },
  2023: { ramazan: '2023-04-21', kurban: '2023-06-28' },
  2024: { ramazan: '2024-04-10', kurban: '2024-06-16' },
  2025: { ramazan: '2025-03-30', kurban: '2025-06-06' },
  2026: { ramazan: '2026-03-20', kurban: '2026-05-27' },
  2027: { ramazan: '2027-03-09', kurban: '2027-05-16' },
  2028: { ramazan: '2028-02-26', kurban: '2028-05-05' },
  2029: { ramazan: '2029-02-14', kurban: '2029-04-24' },
  2030: { ramazan: '2030-02-04', kurban: '2030-04-13' },
}

/** Dini bayram verisinin kapsadığı yıl aralığı; dışındaki yıllarda fonksiyonlar null döner */
export const HOLIDAY_YEARS_TR = { from: 2020, to: 2030 } as const

const DAY_MS = 86_400_000

// 'YYYY-MM-DD' veya Date girdisini UTC gün başlangıcı (ms) olarak çözer; geçersizse null
function parseDate(value: Date | string): number | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null
    return Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())
  }
  if (typeof value !== 'string' || value.length !== 10) return null
  for (let i = 0; i < 10; i++) {
    const c = value.charCodeAt(i)
    if (i === 4 || i === 7) {
      if (c !== 45) return null // '-'
    } else if (c < 48 || c > 57) return null
  }
  const y = Number(value.slice(0, 4))
  const m = Number(value.slice(5, 7))
  const d = Number(value.slice(8, 10))
  const ms = Date.UTC(y, m - 1, d)
  const t = new Date(ms)
  // '2026-02-30' gibi takvimde olmayan tarihleri reddet
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== m - 1 || t.getUTCDate() !== d) return null
  return ms
}

function toISO(ms: number): string {
  const t = new Date(ms)
  const m = String(t.getUTCMonth() + 1).padStart(2, '0')
  const d = String(t.getUTCDate()).padStart(2, '0')
  return `${t.getUTCFullYear()}-${m}-${d}`
}

function officialHolidays(year: number): TRHoliday[] {
  return [
    { date: `${year}-01-01`, name: 'Yılbaşı', kind: 'resmi', halfDay: false },
    {
      date: `${year}-04-23`,
      name: 'Ulusal Egemenlik ve Çocuk Bayramı',
      kind: 'resmi',
      halfDay: false,
    },
    { date: `${year}-05-01`, name: 'Emek ve Dayanışma Günü', kind: 'resmi', halfDay: false },
    {
      date: `${year}-05-19`,
      name: "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
      kind: 'resmi',
      halfDay: false,
    },
    {
      date: `${year}-07-15`,
      name: 'Demokrasi ve Millî Birlik Günü',
      kind: 'resmi',
      halfDay: false,
    },
    { date: `${year}-08-30`, name: 'Zafer Bayramı', kind: 'resmi', halfDay: false },
    { date: `${year}-10-28`, name: 'Cumhuriyet Bayramı Arifesi', kind: 'resmi', halfDay: true },
    { date: `${year}-10-29`, name: 'Cumhuriyet Bayramı', kind: 'resmi', halfDay: false },
  ]
}

function religiousHolidays(year: number): TRHoliday[] | null {
  const entry = RELIGIOUS_FIRST_DAYS[year]
  if (entry === undefined) return null
  // Tablo değerleri geçerli ISO tarihlerdir; cast güvenlidir
  const ramazan = parseDate(entry.ramazan) as number
  const kurban = parseDate(entry.kurban) as number
  const list: TRHoliday[] = [
    { date: toISO(ramazan - DAY_MS), name: 'Ramazan Bayramı Arifesi', kind: 'dini', halfDay: true },
  ]
  for (let i = 0; i < 3; i++) {
    list.push({
      date: toISO(ramazan + i * DAY_MS),
      name: `Ramazan Bayramı ${i + 1}. Günü`,
      kind: 'dini',
      halfDay: false,
    })
  }
  list.push({
    date: toISO(kurban - DAY_MS),
    name: 'Kurban Bayramı Arifesi',
    kind: 'dini',
    halfDay: true,
  })
  for (let i = 0; i < 4; i++) {
    list.push({
      date: toISO(kurban + i * DAY_MS),
      name: `Kurban Bayramı ${i + 1}. Günü`,
      kind: 'dini',
      halfDay: false,
    })
  }
  return list
}

/**
 * Returns Turkey's official and religious holidays for a year, sorted by date.
 * Bir yılın resmî ve dini tatillerini tarih sıralı döner. Dini bayram tarihleri
 * Diyanet takvimiyle doğrulanmıştır; desteklenen aralık dışı yıllarda null döner
 * (bkz. HOLIDAY_YEARS_TR).
 *
 * @example
 * getHolidaysTR(2026)?.find((h) => h.date === '2026-05-27')?.name // 'Kurban Bayramı 1. Günü'
 */
export function getHolidaysTR(year: number): TRHoliday[] | null {
  if (!Number.isInteger(year)) return null
  const religious = religiousHolidays(year)
  if (religious === null) return null
  return [...officialHolidays(year), ...religious].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
  )
}

/**
 * Checks whether a date is a holiday in Turkey.
 * Tarihin tatil olup olmadığını döner. Yarım günler (arife, 28 Ekim) varsayılan
 * olarak tatil sayılmaz; `includeHalfDays` ile dahil edilebilir. Aynı güne denk
 * gelen tam gün tatil her zaman önceliklidir. Geçersiz tarih veya kapsam dışı
 * yıl için null döner.
 *
 * @example
 * isHolidayTR('2026-10-29') // true
 * isHolidayTR('2026-10-28') // false (yarım gün)
 * isHolidayTR('2026-10-28', { includeHalfDays: true }) // true
 */
export function isHolidayTR(date: Date | string, options?: HolidayOptions): boolean | null {
  const ms = parseDate(date)
  if (ms === null) return null
  const iso = toISO(ms)
  const holidays = getHolidaysTR(new Date(ms).getUTCFullYear())
  if (holidays === null) return null
  const matches = holidays.filter((h) => h.date === iso)
  if (matches.length === 0) return false
  if (matches.some((h) => !h.halfDay)) return true
  return options?.includeHalfDays === true
}

/**
 * Checks whether a date is a working day (not weekend, not a full-day holiday).
 * Tarihin iş günü olup olmadığını döner: hafta sonları ve tam gün tatiller iş
 * günü değildir; yarım günler (arife, 28 Ekim) iş günü sayılır. Hafta sonu her
 * yıl için false döner; hafta içi + kapsam dışı yıl için null döner.
 *
 * @example
 * isWorkingDayTR('2026-05-27') // false (Kurban Bayramı 1. Günü)
 * isWorkingDayTR('2026-05-26') // true (arife — yarım gün çalışılır)
 */
export function isWorkingDayTR(date: Date | string): boolean | null {
  const ms = parseDate(date)
  if (ms === null) return null
  const day = new Date(ms).getUTCDay()
  if (day === 0 || day === 6) return false
  const holiday = isHolidayTR(toISO(ms))
  if (holiday === null) return null
  return !holiday
}

/**
 * Adds (or subtracts) N working days to a date; returns 'YYYY-MM-DD'.
 * Tarihe N iş günü ekler (negatif değerle geri gider); hafta sonları ve tam gün
 * tatiller atlanır. Sonuç desteklenen yıl aralığının dışına taşarsa null döner.
 *
 * @example
 * addWorkingDaysTR('2026-05-25', 2) // '2026-06-01' (arife çalışılır, bayram + hafta sonu atlanır)
 */
export function addWorkingDaysTR(date: Date | string, days: number): string | null {
  const start = parseDate(date)
  if (start === null || !Number.isInteger(days)) return null
  if (days === 0) return toISO(start)
  const step = days > 0 ? DAY_MS : -DAY_MS
  let remaining = Math.abs(days)
  let ms = start
  while (remaining > 0) {
    ms += step
    const working = isWorkingDayTR(toISO(ms))
    if (working === null) return null
    if (working) remaining--
  }
  return toISO(ms)
}
