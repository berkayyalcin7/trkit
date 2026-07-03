/**
 * Validates a Turkish postal code: 5 digits, first two form a province code (01-81).
 * Türk posta kodu doğrular: 5 rakam, ilk iki hane il kodu (01-81) olmalıdır.
 *
 * @example
 * isValidPostalCode('34000') // true
 * isValidPostalCode('82000') // false
 */
export function isValidPostalCode(value: string): boolean {
  if (typeof value !== 'string' || value.length !== 5) return false

  for (let i = 0; i < 5; i++) {
    const c = value.charCodeAt(i)
    if (c < 48 || c > 57) return false
  }

  const province = (value.charCodeAt(0) - 48) * 10 + (value.charCodeAt(1) - 48)
  return province >= 1 && province <= 81
}
