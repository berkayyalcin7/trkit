/**
 * Validates a Turkish tax identification number (Vergi Kimlik No) checksum.
 * Vergi Kimlik Numarasını (10 hane) checksum algoritmasıyla doğrular.
 *
 * @example
 * isValidVKN('1234567890') // true (sentetik test değeri)
 * isValidVKN('1234567891') // false
 */
export function isValidVKN(value: string): boolean {
  if (typeof value !== 'string' || value.length !== 10) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    const d = value.charCodeAt(i) - 48
    if (d < 0 || d > 9) return false
    const tmp = (d + 9 - i) % 10
    sum += tmp === 9 ? 9 : (tmp * 2 ** (9 - i)) % 9
  }

  const last = value.charCodeAt(9) - 48
  if (last < 0 || last > 9) return false
  return last === (10 - (sum % 10)) % 10
}
