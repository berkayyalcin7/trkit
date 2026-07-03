import { normalizeTRPhone } from '../validation/phone'

export type TRPhoneStyle = 'national' | 'international'

/**
 * Formats a Turkish phone number; returns null if invalid.
 * Türk telefon numarasını biçimlendirir; geçersiz girdide null döner.
 *
 * @example
 * formatTRPhone('5321234567') // '0 (532) 123 45 67'
 * formatTRPhone('05321234567', 'international') // '+90 532 123 45 67'
 */
export function formatTRPhone(value: string, style: TRPhoneStyle = 'national'): string | null {
  const n = normalizeTRPhone(value)
  if (n === null) return null
  const area = n.slice(0, 3)
  const mid = n.slice(3, 6)
  const p1 = n.slice(6, 8)
  const p2 = n.slice(8, 10)
  return style === 'international'
    ? `+90 ${area} ${mid} ${p1} ${p2}`
    : `0 (${area}) ${mid} ${p1} ${p2}`
}
