import { asciifyTR } from './asciify'
import { toLowerTR } from './case'

/**
 * Converts text to a URL-safe slug with Turkish-aware transliteration.
 * Metni URL dostu slug'a çevirir; Türkçe karakterler doğru harflere eşlenir
 * (ı→i, ş→s...), kesme işaretleri atılır, diğer ayraçlar tire olur.
 *
 * @example
 * slugifyTR("İstanbul Boğazı'nda yürüyüş") // 'istanbul-bogazinda-yuruyus'
 */
export function slugifyTR(value: string, separator = '-'): string {
  const ascii = asciifyTR(toLowerTR(value))
  let out = ''
  let pendingSep = false
  for (let i = 0; i < ascii.length; i++) {
    const ch = ascii.charAt(i)
    if (ch === "'" || ch === '’') continue // kesme işareti: ayraç değil, atılır
    const c = ascii.charCodeAt(i)
    if ((c >= 97 && c <= 122) || (c >= 48 && c <= 57)) {
      if (pendingSep && out !== '') out += separator
      pendingSep = false
      out += ch
    } else {
      pendingSep = true
    }
  }
  return out
}
