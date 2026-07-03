import { toLowerTR } from './case'

// Türk alfabesi sırası; ç, ğ, ı, i, ö, ş, ü doğru konumda
const TR_ALPHABET = 'abcçdefgğhıijklmnoöprsştuüvyz'

/**
 * Compares two strings by Turkish alphabet order (case-insensitive).
 * İki string'i Türk alfabesi sırasına göre karşılaştırır; `Array.sort` ile
 * kullanılabilir. Alfabe dışı karakterler harflerden sonra, kod noktasına göre sıralanır.
 *
 * @example
 * ['şeker', 'çilek', 'ığdır'].sort(compareTR) // ['çilek', 'ığdır', 'şeker']
 */
export function compareTR(a: string, b: string): number {
  const la = toLowerTR(a)
  const lb = toLowerTR(b)
  const len = Math.min(la.length, lb.length)
  for (let i = 0; i < len; i++) {
    const ca = la.charAt(i)
    const cb = lb.charAt(i)
    if (ca === cb) continue
    const ra = TR_ALPHABET.indexOf(ca)
    const rb = TR_ALPHABET.indexOf(cb)
    if (ra !== -1 && rb !== -1) return ra - rb
    if (ra !== -1) return -1
    if (rb !== -1) return 1
    return ca < cb ? -1 : 1
  }
  return la.length - lb.length
}

/**
 * Returns a new array sorted by Turkish alphabet order; original is untouched.
 * Diziyi Türk alfabesine göre sıralanmış YENİ bir dizi olarak döner.
 * `selector` ile nesne dizileri de sıralanabilir.
 *
 * @example
 * sortTR(['şeker', 'armut', 'çilek']) // ['armut', 'çilek', 'şeker']
 * sortTR(cities, (c) => c.name)
 */
export function sortTR<T>(items: readonly T[], selector?: (item: T) => string): T[] {
  if (!Array.isArray(items)) return []
  const select = selector ?? ((item: T) => String(item))
  return [...items].sort((a, b) => compareTR(select(a), select(b)))
}
