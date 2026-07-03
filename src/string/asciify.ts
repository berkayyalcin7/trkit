const TR_TO_ASCII: Readonly<Record<string, string>> = {
  ç: 'c',
  Ç: 'C',
  ğ: 'g',
  Ğ: 'G',
  ı: 'i',
  İ: 'I',
  ö: 'o',
  Ö: 'O',
  ş: 's',
  Ş: 'S',
  ü: 'u',
  Ü: 'U',
}

/**
 * Replaces Turkish-specific characters with their ASCII counterparts.
 * Türkçe karakterleri ASCII karşılıklarına indirger (deasciify yapmaz).
 *
 * @example
 * asciifyTR('Ağrı Dağı') // 'Agri Dagi'
 */
export function asciifyTR(value: string): string {
  if (typeof value !== 'string') return ''
  let out = ''
  for (const ch of value) out += TR_TO_ASCII[ch] ?? ch
  return out
}
