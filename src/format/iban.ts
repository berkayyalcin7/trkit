import { isValidTRIban } from '../validation/iban'

/**
 * Formats a valid Turkish IBAN into 4-character groups; returns null if invalid.
 * Geçerli TR IBAN'ı 4'lü gruplar halinde biçimlendirir; geçersizse null döner.
 *
 * @example
 * formatIBAN('TR200000000000000000000001') // 'TR20 0000 0000 0000 0000 0000 01'
 */
export function formatIBAN(value: string): string | null {
  if (!isValidTRIban(value)) return null
  let out = ''
  for (let i = 0; i < value.length; i += 4) {
    if (i > 0) out += ' '
    out += value.slice(i, i + 4)
  }
  return out
}
