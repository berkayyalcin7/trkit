/**
 * Uppercases with correct Turkish casing: i→İ, ı→I.
 * Türkçe kurallarına göre büyütür; JS'in yerleşik `toUpperCase`'inin
 * 'i'→'I' hatasını düzeltir. Ortamdan bağımsız, deterministik çalışır.
 *
 * @example
 * toUpperTR('istanbul ığdır') // 'İSTANBUL IĞDIR'
 */
export function toUpperTR(value: string): string {
  if (typeof value !== 'string') return ''
  return value.replaceAll('i', 'İ').replaceAll('ı', 'I').toUpperCase()
}

/**
 * Lowercases with correct Turkish casing: İ→i, I→ı.
 * Türkçe kurallarına göre küçültür; 'İ'→'i̇' (birleşik nokta) hatasını düzeltir.
 *
 * @example
 * toLowerTR('DİYARBAKIR') // 'diyarbakır'
 */
export function toLowerTR(value: string): string {
  if (typeof value !== 'string') return ''
  return value.replaceAll('İ', 'i').replaceAll('I', 'ı').toLowerCase()
}

/**
 * Lowercases the whole string, then uppercases the first character (Turkish rules).
 * Tümünü küçültüp ilk karakteri Türkçe kurallarıyla büyütür.
 *
 * @example
 * capitalizeTR('iSTANBUL') // 'İstanbul'
 */
export function capitalizeTR(value: string): string {
  const lower = toLowerTR(value)
  if (lower === '') return ''
  return toUpperTR(lower.charAt(0)) + lower.slice(1)
}

/**
 * Capitalizes every space-separated word (Turkish rules).
 * Boşlukla ayrılan her kelimenin ilk harfini Türkçe kurallarıyla büyütür.
 *
 * @example
 * titleCaseTR('ağrı dağı etekleri') // 'Ağrı Dağı Etekleri'
 */
export function titleCaseTR(value: string): string {
  if (typeof value !== 'string') return ''
  return value.split(' ').map(capitalizeTR).join(' ')
}
