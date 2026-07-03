export type TRPhoneType = 'any' | 'mobile' | 'landline'

/**
 * Normalizes a Turkish phone number to its bare 10-digit form.
 * Türk telefon numarasını 10 haneli çekirdek forma indirger; geçersizse null.
 * Kabul edilen önekler: '+90', '90' (12 hane), '0' veya öneksiz 10 hane.
 * Ayraç (boşluk, tire, parantez) kabul edilmez.
 *
 * @example
 * normalizeTRPhone('+905321234567') // '5321234567'
 * normalizeTRPhone('0212 123 45 67') // null
 */
export function normalizeTRPhone(value: string): string | null {
  if (typeof value !== 'string') return null

  let digits = value
  if (digits.startsWith('+90')) digits = digits.slice(3)
  else if (digits.startsWith('90') && digits.length === 12) digits = digits.slice(2)
  else if (digits.startsWith('0')) digits = digits.slice(1)

  if (digits.length !== 10) return null
  for (let i = 0; i < 10; i++) {
    const c = digits.charCodeAt(i)
    if (c < 48 || c > 57) return null
  }

  // Alan kodu 2xx/3xx/4xx (sabit hat) veya 5xx (GSM) ile başlar
  const first = digits.charCodeAt(0) - 48
  if (first < 2 || first > 5) return null
  return digits
}

/**
 * Validates a Turkish phone number (GSM or landline).
 * Türk telefon numarası doğrular; `type` ile GSM/sabit hat ayrımı yapılabilir.
 *
 * @example
 * isValidTRPhone('05321234567') // true
 * isValidTRPhone('02121234567', 'mobile') // false
 */
export function isValidTRPhone(value: string, type: TRPhoneType = 'any'): boolean {
  const normalized = normalizeTRPhone(value)
  if (normalized === null) return false
  if (type === 'mobile') return normalized.charCodeAt(0) === 53 // '5'
  if (type === 'landline') return normalized.charCodeAt(0) !== 53
  return true
}
