const ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz']
const TENS = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan']
const SCALES = ['', 'bin', 'milyon', 'milyar', 'trilyon']

// İndeksler hesaplanmış rakamlardır (0-9); cast güvenlidir
function threeDigitsToWords(n: number): string {
  const h = Math.floor(n / 100)
  const t = Math.floor((n % 100) / 10)
  const o = n % 10
  let out = ''
  if (h === 1) out = 'yüz'
  else if (h > 1) out = `${ONES[h] as string} yüz`
  if (t > 0) out += `${out === '' ? '' : ' '}${TENS[t] as string}`
  if (o > 0) out += `${out === '' ? '' : ' '}${ONES[o] as string}`
  return out
}

function integerToWordsTR(n: number): string {
  if (n === 0) return 'sıfır'
  const groups: number[] = []
  let rest = n
  while (rest > 0) {
    groups.push(rest % 1000)
    rest = Math.floor(rest / 1000)
  }
  const parts: string[] = []
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i] as number
    if (g === 0) continue
    if (i === 1 && g === 1)
      parts.push('bin') // 'bir bin' denmez
    else {
      const scale = SCALES[i] as string
      parts.push(scale === '' ? threeDigitsToWords(g) : `${threeDigitsToWords(g)} ${scale}`)
    }
  }
  return parts.join(' ')
}

export interface NumberToWordsOptions {
  /** true: lira/kuruş olarak okur (2 haneye yuvarlar) */
  currency?: boolean
}

/**
 * Converts a number to Turkish words; currency mode reads lira/kuruş.
 * Sayıyı Türkçe yazıya çevirir (e-fatura, çek, sözleşme senaryoları).
 * Aralık: |n| < 1 katrilyon. Aralık dışı veya çözümsüz girdide null döner.
 *
 * @example
 * numberToWordsTR(2024) // 'iki bin yirmi dört'
 * numberToWordsTR(1250.75, { currency: true }) // 'bin iki yüz elli lira yetmiş beş kuruş'
 */
export function numberToWordsTR(value: number, options?: NumberToWordsOptions): string | null {
  if (options?.currency === true) {
    if (!Number.isFinite(value)) return null
    const total = Math.round(Math.abs(value) * 100)
    if (!Number.isSafeInteger(total)) return null
    const lira = Math.floor(total / 100)
    const kurus = total % 100
    const parts: string[] = []
    if (lira > 0 || kurus === 0) parts.push(`${integerToWordsTR(lira)} lira`)
    if (kurus > 0) parts.push(`${integerToWordsTR(kurus)} kuruş`)
    return `${value < 0 && total > 0 ? 'eksi ' : ''}${parts.join(' ')}`
  }

  if (!Number.isSafeInteger(value) || Math.abs(value) >= 1e15) return null
  return `${value < 0 ? 'eksi ' : ''}${integerToWordsTR(Math.abs(value))}`
}

// Her sayı kelimesinin son sözcüğü bu haritada mevcuttur
const ORDINALS: Readonly<Record<string, string>> = {
  sıfır: 'sıfırıncı',
  bir: 'birinci',
  iki: 'ikinci',
  üç: 'üçüncü',
  dört: 'dördüncü',
  beş: 'beşinci',
  altı: 'altıncı',
  yedi: 'yedinci',
  sekiz: 'sekizinci',
  dokuz: 'dokuzuncu',
  on: 'onuncu',
  yirmi: 'yirminci',
  otuz: 'otuzuncu',
  kırk: 'kırkıncı',
  elli: 'ellinci',
  altmış: 'altmışıncı',
  yetmiş: 'yetmişinci',
  seksen: 'sekseninci',
  doksan: 'doksanıncı',
  yüz: 'yüzüncü',
  bin: 'bininci',
  milyon: 'milyonuncu',
  milyar: 'milyarıncı',
  trilyon: 'trilyonuncu',
}

/**
 * Converts a non-negative integer to its Turkish ordinal words.
 * Sayıyı Türkçe sıra sayısına çevirir; negatif veya aralık dışı girdide null.
 *
 * @example
 * numberToOrdinalTR(4) // 'dördüncü'
 * numberToOrdinalTR(21) // 'yirmi birinci'
 */
export function numberToOrdinalTR(value: number): string | null {
  if (!Number.isSafeInteger(value) || value < 0) return null
  const words = numberToWordsTR(value)
  if (words === null) return null
  const idx = words.lastIndexOf(' ')
  const last = idx === -1 ? words : words.slice(idx + 1)
  return `${idx === -1 ? '' : words.slice(0, idx + 1)}${ORDINALS[last] as string}`
}
