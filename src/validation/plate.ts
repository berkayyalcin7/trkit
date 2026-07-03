// Türk plakalarında kullanılan harfler (Q, W, X ve Türkçe karakterler hariç)
const PLATE_LETTERS = 'ABCDEFGHIJKLMNOPRSTUVYZ'

/**
 * Validates a Turkish vehicle license plate.
 * Türk araç plakası doğrular: il kodu (01-81) + harf grubu + rakam grubu.
 * '34 ABC 123' ve '34ABC123' formatlarının ikisi de kabul edilir (büyük harf).
 *
 * Geçerli desenler: 1 harf + 4-5 rakam, 2 harf + 3-4 rakam, 3 harf + 2-3 rakam.
 *
 * @example
 * isValidPlate('34 ABC 123') // true
 * isValidPlate('34 Q 12345') // false (Q plakada kullanılmaz)
 */
export function isValidPlate(value: string): boolean {
  if (typeof value !== 'string') return false

  let compact = ''
  for (let i = 0; i < value.length; i++) {
    const ch = value.charAt(i)
    if (ch !== ' ') compact += ch
  }
  if (compact.length < 7 || compact.length > 8) return false

  const p1 = compact.charCodeAt(0) - 48
  const p2 = compact.charCodeAt(1) - 48
  if (p1 < 0 || p1 > 9 || p2 < 0 || p2 > 9) return false
  const province = p1 * 10 + p2
  if (province < 1 || province > 81) return false

  let i = 2
  while (i < compact.length && PLATE_LETTERS.includes(compact.charAt(i))) i++
  const letters = i - 2
  if (letters < 1 || letters > 3) return false

  const digits = compact.length - i
  for (; i < compact.length; i++) {
    const c = compact.charCodeAt(i)
    if (c < 48 || c > 57) return false
  }

  if (letters === 1) return digits === 4 || digits === 5
  if (letters === 2) return digits === 3 || digits === 4
  return digits === 2 || digits === 3
}
