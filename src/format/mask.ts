import { isValidTRIban } from '../validation/iban'
import { normalizeTRPhone } from '../validation/phone'
import { isValidTCKN } from '../validation/tckn'

/**
 * Masks a TCKN for KVKK-compliant display: first 3 and last 2 digits visible.
 * TC Kimlik No'yu KVKK dostu maskeler: ilk 3 ve son 2 hane görünür.
 *
 * @example
 * maskTCKN('10000000146') // '100******46'
 */
export function maskTCKN(value: string): string | null {
  if (!isValidTCKN(value)) return null
  return `${value.slice(0, 3)}******${value.slice(9)}`
}

/**
 * Masks a Turkish phone number: area code and last 2 digits visible.
 * Telefon numarasını maskeler: alan kodu ve son 2 hane görünür.
 *
 * @example
 * maskPhone('+905321234567') // '532*****67'
 */
export function maskPhone(value: string): string | null {
  const n = normalizeTRPhone(value)
  if (n === null) return null
  return `${n.slice(0, 3)}*****${n.slice(8)}`
}

/**
 * Masks a Turkish IBAN: country + check digits and last 4 digits visible.
 * IBAN'ı maskeler: 'TRxx' ve son 4 hane görünür.
 *
 * @example
 * maskIBAN('TR200000000000000000000001') // 'TR20******************0001'
 */
export function maskIBAN(value: string): string | null {
  if (!isValidTRIban(value)) return null
  return `${value.slice(0, 4)}${'*'.repeat(18)}${value.slice(22)}`
}

/**
 * Masks an e-mail address: first 2 characters of the local part visible.
 * E-posta adresini maskeler: yerel kısmın ilk 2 karakteri görünür kalır;
 * maske uzunluğu sabittir, gerçek uzunluğu sızdırmaz.
 *
 * @example
 * maskEmail('berkay@example.com') // 'be***@example.com'
 */
export function maskEmail(value: string): string | null {
  if (typeof value !== 'string' || value.includes(' ')) return null
  const at = value.indexOf('@')
  if (at <= 0 || at !== value.lastIndexOf('@')) return null
  const local = value.slice(0, at)
  const domain = value.slice(at + 1)
  if (domain.length < 3 || !domain.includes('.')) return null
  if (domain.startsWith('.') || domain.endsWith('.')) return null
  const visible = local.length > 2 ? local.slice(0, 2) : ''
  return `${visible}***@${domain}`
}
