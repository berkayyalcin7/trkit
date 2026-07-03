export interface FormatTRYOptions {
  /** '₺' (varsayılan), 'TL' veya 'none' */
  symbol?: '₺' | 'TL' | 'none'
}

/**
 * Formats an amount in Turkish lira convention: dot thousands, comma decimals.
 * Tutarı Türk formatında biçimlendirir: binlik '.', ondalık ',', 2 hane kuruş.
 * `Intl`'e bağımlı olmadığı için her ortamda aynı çıktıyı üretir.
 *
 * @example
 * formatTRY(1250.75) // '1.250,75 ₺'
 * formatTRY(1250.75, { symbol: 'none' }) // '1.250,75'
 */
export function formatTRY(amount: number, options?: FormatTRYOptions): string | null {
  if (!Number.isFinite(amount)) return null
  const total = Math.round(Math.abs(amount) * 100)
  if (!Number.isSafeInteger(total)) return null

  const lira = String(Math.floor(total / 100))
  const kurus = String(total % 100).padStart(2, '0')

  let grouped = ''
  for (let i = 0; i < lira.length; i++) {
    grouped += lira.charAt(i)
    const fromEnd = lira.length - 1 - i
    if (fromEnd > 0 && fromEnd % 3 === 0) grouped += '.'
  }

  const body = `${amount < 0 && total > 0 ? '-' : ''}${grouped},${kurus}`
  const symbol = options?.symbol ?? '₺'
  return symbol === 'none' ? body : `${body} ${symbol}`
}

/**
 * Parses a Turkish-formatted currency string back to a number.
 * Türk formatındaki tutar metnini sayıya çevirir; çözülemezse null döner.
 *
 * @example
 * parseTRY('1.250,75 ₺') // 1250.75
 * parseTRY('1.250,75 TL') // 1250.75
 */
export function parseTRY(value: string): number | null {
  if (typeof value !== 'string') return null
  let text = value.trim()
  if (text.endsWith('₺')) text = text.slice(0, -1).trim()
  else if (text.startsWith('₺')) text = text.slice(1).trim()
  else if (text.toUpperCase().endsWith('TL')) text = text.slice(0, -2).trim()
  if (text === '') return null

  let commas = 0
  for (const ch of text) {
    if (ch === ',') commas++
  }
  if (commas > 1) return null

  const normalized = text.replaceAll('.', '').replaceAll(',', '.')
  if (normalized === '') return null
  for (let i = 0; i < normalized.length; i++) {
    const c = normalized.charCodeAt(i)
    if (i === 0 && c === 45 && normalized.length > 1) continue // baştaki '-'
    if (c === 46) continue // ondalık noktası
    if (c < 48 || c > 57) return null
  }

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}
