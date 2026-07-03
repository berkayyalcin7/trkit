/**
 * Validates a Turkish national identity number (T.C. Kimlik No) checksum.
 * TC Kimlik Numarasını resmi checksum algoritmasıyla doğrular.
 *
 * Format/checksum kontrolüdür; numaranın bir kişiye ait olup olmadığını
 * sorgulamaz (NVİ servisi bilinçli olarak kapsam dışıdır).
 * Girdi normalize edilmez: boşluk/tire içeren değerler geçersiz sayılır.
 *
 * @example
 * isValidTCKN('10000000146') // true (sentetik test değeri)
 * isValidTCKN('12345678901') // false
 */
export function isValidTCKN(value: string): boolean {
  if (typeof value !== 'string' || value.length !== 11) return false
  // İlk hane 0 olamaz
  if (value.charCodeAt(0) === 48) return false

  let odd = 0 // 1, 3, 5, 7, 9. haneler
  let even = 0 // 2, 4, 6, 8. haneler
  for (let i = 0; i < 9; i++) {
    const d = value.charCodeAt(i) - 48
    if (d < 0 || d > 9) return false
    if (i % 2 === 0) odd += d
    else even += d
  }

  const d10 = value.charCodeAt(9) - 48
  const d11 = value.charCodeAt(10) - 48
  if (d10 < 0 || d10 > 9 || d11 < 0 || d11 > 9) return false

  // 10. hane: ((tek haneler × 7) − çift haneler) mod 10
  if (d10 !== (((odd * 7 - even) % 10) + 10) % 10) return false
  // 11. hane: ilk 10 hanenin toplamı mod 10
  return (odd + even + d10) % 10 === d11
}
