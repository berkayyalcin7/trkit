/**
 * Validates a Turkish IBAN (TR + 24 digits, mod-97 check).
 * TR IBAN doğrular: 'TR' + 24 rakam, ISO 13616 mod-97 kontrolü.
 *
 * Girdi normalize edilmez: boşluklu veya küçük harfli değerler geçersiz sayılır
 * (boşluklu gösterim için `formatIBAN` kullanın).
 *
 * @example
 * isValidTRIban('TR200000000000000000000001') // true (sentetik test değeri)
 * isValidTRIban('TR210000000000000000000001') // false
 */
export function isValidTRIban(value: string): boolean {
  if (typeof value !== 'string' || value.length !== 26) return false
  if (value.charCodeAt(0) !== 84 || value.charCodeAt(1) !== 82) return false // 'TR'

  for (let i = 2; i < 26; i++) {
    const c = value.charCodeAt(i)
    if (c < 48 || c > 57) return false
  }

  // mod-97: BBAN + 'TR' karşılığı (T=29, R=27) + kontrol haneleri
  const rearranged = `${value.slice(4)}2927${value.slice(2, 4)}`
  let rem = 0
  for (let i = 0; i < rearranged.length; i++) {
    rem = (rem * 10 + (rearranged.charCodeAt(i) - 48)) % 97
  }
  return rem === 1
}
